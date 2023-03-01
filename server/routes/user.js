const userController = require('../controller/userController');
const {checkAuthenticated, checkUserInSession} = require('../services/authService');
const services = require('../services/render');
const express = require("express");
const routeConfig = require("../services/userRoutesConfig");
const multer = require("multer");
const router = express.Router();

// Render views according to address
router.get('/', [
    checkAuthenticated,
    routeConfig.permissionLevelRequired('admin'),
    userController.getAllUsers
]);
router.get('/view-user/:id', [
    checkAuthenticated,
    routeConfig.permissionLevelRequired('admin'),
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
router.get('/update-user/upload-image/:id',
    checkAuthenticated,
    services.viewUploadImagePage
);

// API for CRUD operations
router.post('/add-user',
    userController.addUser
);
router.patch('/update-user/:id',
    userController.updateUser
);
router.delete('/delete-user/:id',
    userController.deleteUser
);

router.post('/update-user/upload-image/:id',
    userController.uploadImage
);

module.exports = router;