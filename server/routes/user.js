const userController = require('../controller/userController');
const {checkAuthenticated, checkLoggedInOut} = require('../services/authService');
const services = require('../services/render');
const express = require("express");
const routeConfig = require("../services/userRoutesConfig");
const router = express.Router();

// Render views according to address
router.get('/', [
    checkLoggedInOut,
    checkAuthenticated,
    userController.getAllUsers
]);
router.get('/view-user/:id', [
    checkAuthenticated,
    userController.getUser
]);
router.get('/add-user', [
    checkAuthenticated,
    routeConfig.permissionLevelRequired('admin'),
    services.viewAddUserPage
]);
router.get('/update-user/:id', [
    checkAuthenticated,
    routeConfig.sameUserOrAdminRequired,
    services.viewUpdateUserPage
]);
router.get('/delete-user/:id', [
    checkAuthenticated,
    routeConfig.permissionLevelRequired('admin'),
    routeConfig.sameUserCannotPerformAction,
    services.viewDeleteUserPage
]);

// API for CRUD operations
router.post('/add-user', userController.addUser);
router.patch('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;