const gpuServices = require("../services/gpuServices");
const viewSelectedGPU = async (req, res) => {
    await gpuServices.getGPUandRender(req, res, 'viewGPU');
}

const viewMySelectedGPU = async (req, res) => {
    await gpuServices.getGPUandRender(req, res, 'viewMyGPU');
}

const addGPU = async (req, res) => {
    await gpuServices.createGPUandSave(req, res, 'gpuInfoPage');
}

const addMyGPU = async (req, res) => {
    await gpuServices.createGPUandSave(req, res, 'userpage');
}

const updateGPU = async (req, res) => {
    await gpuServices.getGPUandUpdate(req, res, 'gpuInfoPage');
}

const updateMyGPU = async (req, res) => {
    await gpuServices.getGPUandUpdate(req, res, 'userpage');
}

const deleteGPU = async (req, res) => {
    await gpuServices.deleteGPU(req, res, 'gpuInfoPage');
}

const deleteMyGPU = async (req, res) => {
    await gpuServices.deleteGPU(req, res, 'userpage');
}

module.exports = {
    viewSelectedGPU,
    viewMySelectedGPU,
    addGPU,
    addMyGPU,
    updateGPU,
    updateMyGPU,
    deleteGPU,
    deleteMyGPU
}