const {findByID} = require("./userService");
const passport = require("passport");


exports.permissionLevelRequired = (userRole) => {
    return async (req, res, next) => {
        let user = passport.session.user;

        if (user.role === userRole) {
            return next();
        } else {
            return res.redirect('/users');
        }
    };
}

exports.sameUserOrAdminRequired = async (req, res, next) => {

    let user = await findByID(req.params.id);
    let userInSession = passport.session.user;

    console.log(user.id + ' ' + userInSession.id)
    // Only users with admin role or their ID and session ID match
    if (user.id === userInSession.id) {
        return next();
    }
    else {
        if (userInSession.role === 'admin') {
            return next();
        } else {
            return res.redirect('/users');
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