const express = require('express');
const gpuRoutes = require('./gpu.js')
const router = express.Router();

router.use('/gpu', gpuRoutes)

module.exports = router;
