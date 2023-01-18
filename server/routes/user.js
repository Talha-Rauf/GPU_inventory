const userController = require('../controller/userController');
const express = require("express");
const router = express.Router();

router.get('/', userController.viewAllUsers);
router.get('/:id', userController.viewUser);
router.post('/add_user', userController.addUser);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;