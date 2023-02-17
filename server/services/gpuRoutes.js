const gpuServices = require("./gpuServices");
const services = require('./render');

const viewUpdateGPUPage = async (req, res) => {
    await services.updateGPUPage(req, res, 'editGPU');
}

const viewUpdateMyGPUPage = async (req, res) => {
    await services.updateGPUPage(req, res, 'editMyGPU');
}

const viewDeleteGPUPage = async (req, res) => {
    await services.viewDeleteGPUPage(req, res, 'confirmGPUDeletion')
}

const viewDeleteMyGPUPage = async (req, res) => {
    await services.viewDeleteGPUPage(req, res, 'confirmMyGPUDeletion')
}

module.exports = {
    viewUpdateGPUPage,
    viewUpdateMyGPUPage,
    viewDeleteGPUPage,
    viewDeleteMyGPUPage
}