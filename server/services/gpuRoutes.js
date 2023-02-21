const services = require('./render');
const gpuService = require('./gpuServices')

const viewGlobalGPUPage = async (req, res) => {
    await gpuService.getAllGPUAndRender(req, res, 'GPUPage')
}

const viewAddGPUPage = async (req, res) => {
    console.log('LOADING ADD-GPU PAGE...');
    await services.addGPUPage(req, res, 'addGPU');
}

const viewAddMyGPUPage = async (req, res) => {
    await services.addGPUPage(req, res, 'addMyGPU');
}

const viewUpdateGPUPage = async (req, res) => {
    await services.editGPUPage(req, res, 'editGPU');
}

const viewUpdateMyGPUPage = async (req, res) => {
    await services.editGPUPage(req, res, 'editMyGPU');
}

const viewDeleteGPUPage = async (req, res) => {
    await services.viewDeleteGPUPage(req, res, 'confirmGPUDeletion')
}

const viewDeleteMyGPUPage = async (req, res) => {
    await services.viewDeleteGPUPage(req, res, 'confirmMyGPUDeletion')
}

module.exports = {
    viewGlobalGPUPage,
    viewAddGPUPage,
    viewAddMyGPUPage,
    viewUpdateGPUPage,
    viewUpdateMyGPUPage,
    viewDeleteGPUPage,
    viewDeleteMyGPUPage
}