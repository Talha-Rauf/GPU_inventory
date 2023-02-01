const {findByID} = require("./userService");


exports.permissionLevelRequired = (userRole) => {
    return (req, res, next) => {
        let user = findByID(req.params.userId);
        let user_role = user.role;

        if (user_role.toLowerCase() && userRole.toLowerCase()) {
            return next();
        } else {
            return res.render('usersInfoPage', { "errorMessage": req.flash("ONLY ADMINS CAN PERFORM THIS ACTION!") });
        }
    };
}

exports.sameUserOrAdminRequired = (req, res, next) => {

    let user = findByID(req.params.userId);
    let user_role = user.role.toLowerCase();
    let userId = req.user.userId;

    if (req.params && req.params.userId && userId === req.params.userId) {
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