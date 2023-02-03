const {findByID} = require("./userService");
const {User} = require("../model");


exports.permissionLevelRequired = (userRole) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const user = await User.findById(id);
        let user_role = user.role;

        console.log("Current user: " + user.firstName + " is trying to add with role: " + user_role + ".");

        if (user_role && userRole) {
            return next();
        } else {
            return res.redirect('/users', { "errorMessage": req.flash("ONLY ADMINS CAN PERFORM THIS ACTION!") });
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