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

router.use('/', homeRoute);
router.use('/users', userRoute);
router.use('/userpage', userspaceRoute);
router.use('/gpu', gpuRoute);

module.exports = router;
