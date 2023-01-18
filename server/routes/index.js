const express = require('express');
const userRoute = require('./user');
const homeRoute = require('./home')
const router = express.Router();

router.use('/', homeRoute);
router.use('/users', userRoute);

module.exports = router;
