const {checkAuthenticated, checkUserInSession} = require('../services/authService');
const services = require('../services/render');
const express = require("express");
const gpuController = require("../controller/gpuController");
const gpuServices = require("../services/gpuRoutes");
const {sameUserOrAdminRequired} = require("../services/userRoutesConfig");
const router = express.Router();

router.get('/gpu/:id',
    checkAuthenticated,
    gpuController.getGPU
);

router.get('/add-gpu',
    checkAuthenticated,
    gpuServices.viewAddGPUPage
);

router.get('/update-gpu/:id',
    checkAuthenticated,
    sameUserOrAdminRequired,
    gpuServices.viewUpdateGPUPage
);

router.get('/delete-gpu/:id',
    checkAuthenticated,
    sameUserOrAdminRequired,
    gpuServices.viewDeleteGPUPage
);

router.patch('/update-gpu/:id',
    checkAuthenticated,
    sameUserOrAdminRequired,
    gpuController.updateGPU
);

router.delete('/delete-gpu/:id',
    checkAuthenticated,
    sameUserOrAdminRequired,
    gpuController.deleteGPU
);

module.exports = router;