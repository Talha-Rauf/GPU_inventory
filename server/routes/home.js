const services = require('../services/render');
const verification = require('../authentication/verifyUser');
const userController = require('../controller/userController');
const express = require("express");
const router = express.Router();
const passport = require('passport');

router.get('/', services.viewHomePage);
router.get('/login', services.viewLoginPage);
router.get('/signup', services.viewSignUpPage);
router.get('/logout', services.logoutUser);

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFLash: true,
}));

router.post('/signup', [
    userController.addUser
]);

module.exports = router;