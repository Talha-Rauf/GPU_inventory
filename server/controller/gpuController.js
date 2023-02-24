const gpuServices = require("../services/gpuServices");
const passport = require("passport");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");
const gpuService = require("../services/gpuServices");
const catchAsync = require("../utils/catchAsync");

const getAllGPUs = catchAsync(async (req, res) => {
    const gpus_data = await gpuService.queryGpuData('model');
    if (!gpus_data) {throw new ApiError(httpStatus.NOT_FOUND, 'GPUs data not found');}
    res.render('GPUPage', {gpu: gpus_data, user: passport.session.user});
});

const getGPU = catchAsync(async (req, res) => {
    const gpu = await gpuService.findGpuByID(req.params.id);
    if (!gpu) {throw new ApiError(httpStatus.NOT_FOUND, 'GPU not found');}
    res.render('viewGPU', {gpu: gpu, user: passport.session.user});
});

const getMyGPU = catchAsync(async (req, res) => {
    const gpu = await gpuService.findGpuByID(req.params.id);
    if (!gpu) {throw new ApiError(httpStatus.NOT_FOUND, 'GPU not found');}
    res.render('viewMyGPU', {gpu: gpu, user: passport.session.user});
});

const addGPU = catchAsync(async (req, res) => {
    await gpuServices.createGPU(req.body);
    res.redirect('/gpu');
});

const addMyGPU = catchAsync(async (req, res) => {
    await gpuServices.createGPU(req.body);
    res.redirect('/userpage');
});

const updateGPU = catchAsync(async (req, res) => {
    await gpuServices.updateGPU(req.params.id, req.body);
    res.redirect('/gpu/view-gpu/' + req.params.id);
});

const updateMyGPU = catchAsync(async (req, res) => {
    await gpuServices.updateGPU(req.params.id, req.body);
    res.redirect('/userpage/view-gpu/' + req.params.id);
});

const deleteGPU = catchAsync(async (req, res) => {
    await gpuServices.deleteGPU(req.params.id);
    res.redirect('/gpu');
});

const deleteMyGPU = catchAsync(async (req, res) => {
    await gpuServices.deleteGPU(req.params.id);
    res.redirect('/userpage');
});

module.exports = {
    getAllGPUs,
    getGPU,
    getMyGPU,
    addGPU,
    addMyGPU,
    updateGPU,
    updateMyGPU,
    deleteGPU,
    deleteMyGPU
}