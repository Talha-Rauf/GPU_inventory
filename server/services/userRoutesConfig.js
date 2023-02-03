const {findByID} = require("./userService");
const {User} = require("../model");
const passport = require("passport");


exports.permissionLevelRequired = (userRole) => {
    return async (req, res, next) => {
        let user = passport.session.user;

        console.log("Current user: " + user.firstName + " is trying to add with role: " + user.role + ".");

        if (user.role === userRole) {
            return next();
        } else {
            return res.redirect('/users');
        }
    };
}

exports.sameUserOrAdminRequired = (req, res, next) => {

    let user = findByID(req.params.id);
    let user_role = user.role.toLowerCase();
    let userId = req.user.id;

    if (req.params && req.params.id && userId === req.params.id) {
        return next();
    } else {
        if (user_role && 'admin') {
            return next();
        } else {
            return res.status(403).send();
        }
    }
}

exports.sameUserCannotPerformAction = (req, res, next) => {

}