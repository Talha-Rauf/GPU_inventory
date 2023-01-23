const services = require('../services/render');
const express = require("express");
const router = express.Router();

router.get('/', services.viewHomePage);
router.get('/login', services.viewLoginPage);
router.get('/signup', services.viewSignUpPage);

module.exports = router;