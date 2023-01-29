const LocalStrategy = require('passport-local').Strategy;
const verify = require('../services/authService');

function initialize(passport) {
    passport.use(new LocalStrategy({usernameField: 'email'}, verify.isUserAndPasswordCorrect));
    passport.serializeUser((user, done) => {  })
    passport.deserializeUser((id, done) => {  })
}

module.exports = initialize;