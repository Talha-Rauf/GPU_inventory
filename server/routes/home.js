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
    services.logoutUser,
    authService.checkLoggedInOut
]);

router.post('/login', authService.authenticateUser, (req,res)=>{console.log("Current user in session has ID: " + req.user.usernameField)});

router.post('/signup', [
    authService.checkNotAuthenticated,
    userController.signupUser,
]);

module.exports = router;