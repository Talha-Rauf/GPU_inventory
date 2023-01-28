const userController = require('../controller/userController');
const services = require('../services/render');
const express = require("express");
const connectEnsureLogin = require("connect-ensure-login");
const router = express.Router();

// Render views according to address
router.get('/', [
    connectEnsureLogin.ensureLoggedIn(),
    userController.getAllUsers
]);
router.get('/view-user/:id', [
    connectEnsureLogin.ensureLoggedIn(),
    userController.getUser
]);
router.get('/add-user', [
    connectEnsureLogin.ensureLoggedIn(),
    services.viewAddUserPage
]);
router.get('/update-user/:id', [
    connectEnsureLogin.ensureLoggedIn(),
    services.viewUpdateUserPage
]);
router.get('/delete-user/:id', [
    connectEnsureLogin.ensureLoggedIn(),
    services.viewDeleteUserPage
]);

// API for CRUD operations
router.post('/add-user', userController.addUser);
router.post('/update-user/:id', userController.updateUser);
router.post('/delete-user/:id', userController.deleteUser);

module.exports = router;