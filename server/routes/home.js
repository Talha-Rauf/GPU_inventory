const services = require('../services/render');
const verification = require('../authentication/verifyUser');
const userController = require('../controller/userController');
const express = require("express");
const router = express.Router();

router.get('/', services.viewHomePage);
router.get('/login', services.viewLoginPage);
router.get('/signup', services.viewSignUpPage);

router.post('/login', [
    verification.verifyAuthValidFields,
    verification.verifyUserAndPassword,
    userController.getAllUsers
]);

router.post('/signup', [
    verification.verifyAuthValidFields,
    userController.addUser
]);

module.exports = router;