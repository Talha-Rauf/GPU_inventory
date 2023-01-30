const services = require('../services/render');
const userController = require('../controller/userController');
const {checkNotAuthenticated} = require('../services/authService');
const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/', services.viewHomePage);
router.get('/login', checkNotAuthenticated, services.viewLoginPage);
router.get('/signup', checkNotAuthenticated, services.viewSignUpPage);
router.delete('/logout', services.logoutUser);

router.post('/login', checkNotAuthenticated,
    passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFLash: true,
}));

router.post('/signup', [
    checkNotAuthenticated,
    userController.addUser
]);

module.exports = router;