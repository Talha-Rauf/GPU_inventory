const {Gpu} = require('../model/index');
const passport = require("passport");
const ApiError = require("../utils/ApiError");
const httpStatus = require("http-status");

const queryGpuData = async (filter) => {
    return await Gpu.find().sort(filter);
}

const findGpuByID = async (gpuID) => {
    return await Gpu.findOne({gpuID});
}

const createGPU = async (userBody) => {
    return await Gpu.create(userBody);
}

const updateGPU = async (gpuID, updateBody) => {

    const gpu = await findGpuByID(gpuID);

    if (!gpu) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }

    Object.assign(gpu, updateBody);
    await gpu.save();
}

const deleteGPU = async (gpuID) => {
    const gpu = await findGpuByID(gpuID);
    await gpu.remove()
}

module.exports = {
    queryGpuData,
    findGpuByID,
    createGPU,
    updateGPU,
    deleteGPU
}