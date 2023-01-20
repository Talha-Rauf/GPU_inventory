const userController = require('../controller/userController');
const services = require('../services/render');
const express = require("express");
const router = express.Router();

// Render views according to address
router.get('/', userController.getAllUsers);
router.get('/add-user', services.viewAddUserPage);
router.get('/update-user/:id', services.viewUpdateUserPage);
router.get('/delete-user/:id', services.viewDeleteUserPage);

// API for CRUD operations
router.get('/view-user/:id', userController.getUser);
router.post('/add-user', userController.addUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;