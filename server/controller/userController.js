const userServices = require('../services/userService');
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const passport = require("passport");

// view user(s)
const getAllUsers = catchAsync(async (req, res) => {
    const all_users = await userServices.queryUsers('firstName');
    const current_user = passport.session.user;
    if (!all_users) {throw new ApiError(httpStatus.NOT_FOUND, 'User not found');}
    res.render('usersInfoPage', {users: all_users, user: current_user, "errorMessage": req.flash("ONLY ADMINS CAN PERFORM THIS ACTION!")});
});

const getUser = catchAsync(async (req, res) => {
    const user = await userServices.findByID(req.params.id);
    if (!user) {throw new ApiError(httpStatus.NOT_FOUND, 'User not found');}
    res.render('selectedUserInfo', {user});
});

// create new user
const addUser = catchAsync(async (req, res) => {
    await userServices.createUser(req.body);
    res.redirect('/users');
});

const signupUser = catchAsync(async (req, res) => {
    const user = await userServices.createUser(req.body);
    if (!user) {res.render('signUpPage', {errorMessage: 'Email is already taken!'});}
    else {res.redirect('/login');}
});

// Update a user
const updateUser = catchAsync(async (req, res) => {
    await userServices.updateUser(req.params.id, req.body);
    res.redirect('/users/view-user/' + req.params.id);
});

const updateUserSelf = catchAsync(async (req, res) => {
    await userServices.updateUser(req.params.id, req.body);
    res.redirect('/userpage');
});

// Delete a user
const deleteUser = catchAsync(async (req, res) => {
    await userServices.deleteUser(req.params.id);
    res.redirect('/users');
});

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    updateUserSelf,
    deleteUser,
    signupUser
}