const userServices = require('../services/userService');
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const passport = require("passport");

// view user(s)
const getAllUsers = catchAsync(async (req, res) => {
    const all_users = await userServices.queryUsers('firstName');
    const user_in_session = passport.session.user;
    if (!all_users) {throw new ApiError(httpStatus.NOT_FOUND, 'User not found');}
    res.render('usersInfoPage', {users: all_users, user: user_in_session});
});

const getUser = catchAsync(async (req, res) => {
    const user = await userServices.findByID(req.params.id);
    if (!user) {throw new ApiError(httpStatus.NOT_FOUND, 'User not found');}
    res.render('selectedUserInfo', {user});
});

// create new user
const addUser = catchAsync(async (req, res) => {
    const user = await userServices.createUser(req.body);
    if (!user) {res.render('addNewUser', {errorMessage: 'User with this email already exists!'});}
    else {
        await userServices.sendEmailForVerification(user);
        await userServices.sendEmailForNewUser(user);
        res.redirect('/users');
    }
});

const signupUser = catchAsync(async (req, res) => {
    const user = await userServices.signUpUser(req.body);
    if (!user) {res.render('signUpPage', {errorMessage: 'Email is already taken!'});}
    else {
        await userServices.sendEmailForVerification(user);
        res.render('loginPage', {errorMessage: 'Email sent for verification!'});
    }
});

// Update a user through the user inventory page
const updateUser = catchAsync(async (req, res) => {
    await userServices.updateUser(req.params.id, req.body);
    res.redirect('/users/view-user/' + req.params.id);
});

// update a user through the userpage
const updateUserSelf = catchAsync(async (req, res) => {
    await userServices.updateUser(req.params.id, req.body);
    res.redirect('/userpage');
});

// Delete a user
const deleteUser = catchAsync(async (req, res) => {
    await userServices.deleteUser(req.params.id);
    res.redirect('/users');
});

const changePassword = catchAsync(async (req, res) => {
    const user = await userServices.findByID(req.params.id);
    if (req.body.password === req.body.conpassword) { // If password and confirmation password match
        await userServices.changePassword(user.id, req.body.password);
        await userServices.changeCheckToFalse(user.id);
        res.render('loginPage', { user: user, errorMessage: 'Password changed successfully!' });
    }
    else {res.render('resetPassword', { user: user, errorMessage: 'Passwords do not match!' })}
});

const checkIfFalse = catchAsync(async (req,res) => {
    const user = await userServices.findByID(req.params.id);
    if (user.checkFalse) { res.next(); }
    else { res.redirect('/login'); }
});

const sendEmailForReset = catchAsync(async (req, res) => {
    const user = await userServices.findByEmail(req.body.email);
    let message = '';

    if (!user) {message = 'Email does not exist or incorrect!';}
    else {
        await userServices.sendEmailForPassReset(user);
        await userServices.changeCheckToTrue(user.id);
        message = 'Email sent with password reset link!';
    }
    res.render('resetByEmail', {errorMessage: message});
});

const confirmEmail = catchAsync(async (req, res) => {
    const user = await userServices.findByID(req.params.id);
    if (!user.emailVerified) {
        await userServices.changeEmailVerifyToTrue(user.id);
        res.render('emailVerification', {errorMessage: ''});
    }
    else {
        res.render('emailVerification', {errorMessage: 'Email already verified!'});
    }
});

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    updateUserSelf,
    deleteUser,
    signupUser,
    checkIfFalse,
    confirmEmail,
    changePassword,
    sendEmailForReset
}