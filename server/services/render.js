const {User} = require('../model/index');
const passport = require("passport");

const viewHomePage = (req, res) => {
    res.render('index');
}

const viewLoginPage = (req, res) => {
    res.render('loginPage', { "errorMessage": req.flash("Error loading login page...") });
}

const viewSignUpPage = (req, res) => {
    res.render('signUpPage');
}

const viewAddUserPage = (req, res) => {
    res.render('addNewUser');
}

const logoutUser = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
    });
}

const viewUpdateUserPage = async (req, res) => {

    try {
        if (req.params.id) {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                res.status(400).send({message: "User not found..."});
            } else {
                res.render('editUserInfo', {user});
            }
        }
        else{
            res.status(400).send({message: "ID is required..."});
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving user for editing..."});
    }
}

const viewDeleteUserPage = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                res.status(400).send({message: "User not found..."});
            } else {
                res.render('confirmUserDeletion', {user});
            }

        } else {
            res.status(400).send({message: "ID is required..."});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving user for editing..."});
    }
}

const viewUserPage = (req, res) => {
    res.render('userPage', {user: passport.session.user});
}

module.exports = {
    viewHomePage,
    viewLoginPage,
    viewSignUpPage,
    logoutUser,
    viewAddUserPage,
    viewUpdateUserPage,
    viewDeleteUserPage,
    viewUserPage
}
