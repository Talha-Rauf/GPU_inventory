const {findByID} = require('./userService');
const passport = require('passport');
const {Gpu} = require("../model");


exports.permissionLevelRequired = (userRole) => {
    return async (req, res, next) => {
        let user = passport.session.user;

        if (user.role === userRole) {
            return next();
        } else {
            return res.redirect('/userpage');
        }
    };
}

exports.sameUserOrAdminRequired = async (req, res, next) => {

    let user = await findByID(req.params.id);
    let userInSession = passport.session.user;

    // Only users with admin role or their ID and session ID match
    if (user.id === userInSession.id) {
        return next();
    }
    else {
        if (userInSession.role === 'admin') {
            return next();
        } else {
            return res.redirect('/gpu');
        }
    }
}

exports.sameUserOrAdminRequiredForGPU = async (req, res, next) => {

    let gpu = await Gpu.findById(req.params.id);
    let userInSession = passport.session.user;

    // Only users with admin role or their ID and session ID match
    if (gpu.assignedID === userInSession.id) {
        return next();
    }
    else {
        if (userInSession.role === 'admin') {
            return next();
        } else {
            return res.redirect('/gpu');
        }
    }
}

exports.sameUserCannotPerformAction = async (req, res, next) => {

    let user = await findByID(req.params.id);
    let userInSession = passport.session.user;

    if (user.id !== userInSession.id) {
        return next();
    }
    else {
        return res.redirect('/users');
    }
}