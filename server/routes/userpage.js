const {checkAuthenticated, checkUserInSession} = require('../services/authService');
const services = require('../services/render');
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.render('userPage');
});

module.exports = router;