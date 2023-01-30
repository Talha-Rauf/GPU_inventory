if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// Express configuration
const express = require('express');
const router = express.Router();

// Sub-routes
const userRoute = require('./user');
const homeRoute = require('./home')

// Passport configuration
const passport = require("passport");
const initializePassport = require('../authentication/passportConfig');
const {findByEmail, findByID} = require("../services/userService");
const flash = require('express-flash');
const session = require('express-session');
initializePassport(passport, findByEmail, findByID);

router.use(flash());
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());

router.use('/', homeRoute);
router.use('/users', userRoute);

module.exports = router;
