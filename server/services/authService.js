const services = require("./userService");
const bcrypt = require("bcrypt");
const passport = require("passport");
const {User} = require("../model");

exports.isUsernameAndPasswordEmpty = async (req, res, next) => {
    let errors = [];

    if(req.body) {
        if(!req.body.email){
            errors.push('Missing Email Field!');
        }

        if(!req.body.password){
            errors.push('Missing Password Field!')
        }

        if(errors.length){
            return res.status(400).send({errors: errors.join(', ')});
        }
        else{
            return next();
        }
    }
    else{
        return res.status(400).send({errors: 'Missing Email and Password fields!'});
    }
}

exports.isUserAlreadyInDB = async (req, res, next) => {
    try {
        let user = await services.findByEmail(req.body.email);

        if (user == null) {
            return next();
        }
        else {
            res.status(400).send({message: `The user: ${user.email} already exists...`});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data for authentication..."});
    }
}

exports.isUserAndPasswordCorrect = async (email, password, done) => {

    const user = await User.findOne({email});

    if(!user){
        return done(null, false, {message: 'No user with that email!'});
    }

    try{
        if (await bcrypt.compare(password, user.password)) {
            //console.log('User session data:', user);
            passport.session.user = user; // Saves user information in session
            done(null, user);
        }
        else{
            return done(null, false, {message: 'Password incorrect!'});
        }
    }
    catch (err){
        return done(err);
    }
}

exports.checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

exports.checkNotAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()){
        return res.redirect('/userpage');
    }
    return next();
}

exports.authenticateUser = (req, res, next) => {
    passport.authenticate(
        "local",
        {
            successRedirect: '/userpage',
            failureRedirect: '/login',
            failureFLash: true},
        (err, theUser, failureDetails) => {

            if (err) {
                // Something went wrong authenticating user
                return next(err);
            }

            if (!theUser) {
                // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
                res.render('loginPage', {errorMessage: 'Wrong password or username'});
                return;
            }

            // save user in session: req.user
            req.login(theUser, (err) => {
                if (err) {
                    // Session save went bad
                    return next(err);
                }

                // All good, we are now logged in and `req.user` is now set
                res.redirect('/userpage');
            });
        })(req, res, next);
}

exports.checkUserInSession = (req, res, next) => {
    const status = req.isAuthenticated() ? 'logged in' : 'logged out';
    const user = passport.session.user;
    if (user) {
        console.log(
            'user:',user.firstName + ' ' + user.lastName,'\n',
            'role:',user.role,'\n',
            'status:',status, // '\n',
            // req.sessionStore,
            // req.sessionID,
            // req.session
        );
    }
    next();
}

exports.logoutUser = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
    });
}