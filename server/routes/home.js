const services = require('../services/render');
const userController = require('../controller/userController');
const authService = require('../services/authService');
const express = require("express");
const router = express.Router();
const flash = require("connect-flash");

router.use(flash());

router.get('/', services.viewHomePage);

router.get('/login', [
    authService.checkNotAuthenticated,
    services.viewLoginPage
]);

router.get('/signup', [
    authService.checkNotAuthenticated,
    services.viewSignUpPage
]);

router.delete('/logout', [
    services.logoutUser
]);

router.post('/login',
    authService.authenticateUser
);

router.post('/signup', [
    authService.checkNotAuthenticated,
    userController.signupUser,
]);

router.get('/userpage',
    services.viewUserPage
);

module.exports = router;