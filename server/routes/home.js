const services = require('../services/render');
const userController = require('../controller/userController');
const {checkNotAuthenticated} = require('../services/authService');
const express = require("express");
const router = express.Router();
const passport = require('passport');

router.use(passport.initialize());
router.use(passport.session());

router.get('/', services.viewHomePage);
router.get('/login', checkNotAuthenticated, services.viewLoginPage);
router.get('/signup', checkNotAuthenticated, services.viewSignUpPage);
router.delete('/logout', services.logoutUser);

router.post('/login', (req, res, next) => {
    passport.authenticate(
        "local",
        {
            successRedirect: '/users',
            failureRedirect: '/login',
            failureFLash: true},
        (err, theUser, failureDetails) => {
        if (err) {
            // Something went wrong authenticating user
            return next(err);
        }

        if (!theUser) {
            // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
            res.render('auth/login', {errorMessage: 'Wrong password or username'});
            return;
        }

        // save user in session: req.user
        req.login(theUser, (err) => {
            if (err) {
                // Session save went bad
                return next(err);
            }

            // All good, we are now logged in and `req.user` is now set
            res.redirect('/')
        });
    });
});

router.post('/signup', [
    checkNotAuthenticated,
    userController.signupUser,
]);

module.exports = router;