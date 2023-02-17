const {checkAuthenticated, checkUserInSession} = require('../services/authService');
const services = require('../services/render');
const express = require("express");
const gpuController = require("../controller/gpuController");
const gpuServices = require("../services/gpuRoutes");
const router = express.Router();

router.get('/gpu/:id',
    checkAuthenticated,
    gpuController.getGPU
);

router.get('/update-gpu/:id',
    checkAuthenticated,
    gpuServices.viewUpdateGPUPage
);

router.get('/delete-gpu/:id',
    checkAuthenticated,
    gpuServices.viewDeleteGPUPage
);

router.patch('/update-gpu/:id',
    checkAuthenticated,
    gpuController.updateGPU
);

router.delete('/delete-gpu/:id',
    checkAuthenticated,
    gpuController.deleteGPU
);

module.exports = router;