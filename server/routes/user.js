const userController = require('../controller/userController');
const {checkAuthenticated} = require('../services/authService');
const services = require('../services/render');
const express = require("express");
const router = express.Router();

// Render views according to address
router.get('/', [
    checkAuthenticated,
    userController.getAllUsers
]);
router.get('/view-user/:id', [
    checkAuthenticated,
    userController.getUser
]);
router.get('/add-user', [
    checkAuthenticated,
    services.viewAddUserPage
]);
router.get('/update-user/:id', [
    checkAuthenticated,
    services.viewUpdateUserPage
]);
router.get('/delete-user/:id', [
    checkAuthenticated,
    services.viewDeleteUserPage
]);

// API for CRUD operations
router.post('/add-user', userController.addUser);
router.post('/update-user/:id', userController.updateUser);
router.post('/delete-user/:id', userController.deleteUser);

module.exports = router;