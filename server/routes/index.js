if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

// Express configuration
const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

// Sub-routes
const userRoute = require('./user');
const homeRoute = require('./home');
const userspaceRoute = require('./userpage');
const gpuRoute = require('./gpu');

const flash = require('express-flash');

router.use(flash());
router.use(methodOverride('_method'));

router.use('/', homeRoute); // login/signup route
router.use('/users', userRoute); // User inventory route
router.use('/userpage', userspaceRoute); // User dashboard route
router.use('/gpu', gpuRoute); // Global gpu list route

module.exports = router;
