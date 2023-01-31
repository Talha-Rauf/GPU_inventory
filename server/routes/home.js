const services = require('../services/render');
const userController = require('../controller/userController');
const {checkNotAuthenticated, authenticateUser} = require('../services/authService');
const express = require("express");
const router = express.Router();
const flash = require("connect-flash");

router.use(flash());

router.get('/', services.viewHomePage);
router.get('/login', checkNotAuthenticated, services.viewLoginPage);
router.get('/signup', checkNotAuthenticated, services.viewSignUpPage);
router.delete('/logout', services.logoutUser);

router.post('/login', authenticateUser);

router.post('/signup', [
    checkNotAuthenticated,
    userController.signupUser,
]);

module.exports = router;