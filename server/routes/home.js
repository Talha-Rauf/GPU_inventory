const services = require('../services/render');
const verification = require('../authentication/verifyUser');
const userController = require('../controller/userController');
const express = require("express");
const router = express.Router();

router.get('/', services.viewHomePage);
router.get('/login', services.viewLoginPage);
router.get('/signup', services.viewSignUpPage);
router.get('/logout', services.logoutUser);

router.post('/login', [
    verification.verifyAuthValidFields,
    verification.authenticateUser,
    userController.getAllUsers
]);

router.post('/signup', [
    verification.verifyAuthValidFields,
    verification.verifyUserAlreadyExists,
    userController.addUser
]);

module.exports = router;