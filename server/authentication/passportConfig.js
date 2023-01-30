const LocalStrategy = require('passport-local').Strategy;
const services = require('../services/userService');
const verify = require('../services/authService');
const {findByEmail, findByID} = require("../services/userService");

function initialize(passport, findByEmail, findByID) {
    passport.use(new LocalStrategy({usernameField: 'email'}, verify.isUserAndPasswordCorrect));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        return done(null, findByID(id));
    });
}

module.exports = initialize;