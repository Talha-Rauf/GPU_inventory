const LocalStrategy = require('passport-local').Strategy;
const services = require('../services/userService');
const verify = require('../services/authService');
const {findByEmail} = require("../services/userService");

function initialize(passport, findByEmail, findByID) {
    passport.use(new LocalStrategy({usernameField: 'email'}, verify.isUserAndPasswordCorrect));
    passport.serializeUser((user, done) => d)
    passport.deserializeUser((id, done) => {  })
}

module.exports = initialize;