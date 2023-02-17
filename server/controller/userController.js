const userServices = require('../services/userService');

// view user(s)
const getAllUsers = async (req, res) => {
    await userServices.getAllByIDAndRender(req, res, 'usersInfoPage');
}

const getUser = async (req, res) => {
    await userServices.getByIDAndRender(req, res, 'selectedUserInfo');
}

// create new user
const addUser = async (req, res) => {
    await userServices.createUserAndSave(req, res, '/users');
};

const signupUser = async (req, res) => {
    await userServices.createUserAndSave(req, res, '/');
};

// Update a user
const updateUser = async (req, res) => {
    await userServices.getByIdAndUpdate(req, res, '/users');
}

const updateUserSelf = async (req, res) => {
    await userServices.getByIdAndUpdate(req, res, '/userpage');
}

// Delete a user
const deleteUser = async (req, res) => {
    await userServices.getByIdAndDelete(req, res, '/users');
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    updateUserSelf,
    deleteUser,
    signupUser
}