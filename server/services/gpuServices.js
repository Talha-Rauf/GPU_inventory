const {Gpu} = require('../model/index');
const passport = require("passport");

const getGPUandRender = async (req, res, webPage) => {
    try {
        if (req.params.id) {
            const gpu = await Gpu.findById(req.params.id);

            if (!gpu) {
                res.status(400).send({message: "Data not found..."});
            } else {
                res.render(webPage, {gpu});
            }
        } else {
            res.status(400).send({message: "ID is required or missing..."});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data..."});
    }
}


const createGPUandSave = async (req, res, webPage) => {
    try{
        if(!req.body){
            res.status(400).send({message:'Content cannot be empty!'});
        }
        else{
            let user = passport.session.user;
            const gpu = new Gpu({
                company: req.body.company,
                model: req.body.model,
                size: req.body.size,
                condition: req.body.condition,
                assignedID: req.body.assignedID === '' ? user.id : req.body.assignedID
            });

            if (!gpu) {
                res.status(400).send({message: "GPU data missing..."});
            }
            else {
                gpu.save();
                res.redirect(webPage);
            }
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while saving user..."});
    }
}

const getGPUandUpdate = async (req, res, webPage) => {
    try {
        if (!req.body) {
            res.status(400).send({message: 'Content cannot be empty!'});
        }
        else {
            const gpu = await Gpu.findById(req.params.id);
            const user = passport.session.user;

            if (!gpu) {
                res.status(400).send({message: "Data is missing or not found..."});
            }
            else {

                const gpuUpdate = new Gpu({
                    _id: gpu._id,
                    company: req.body.company,
                    model: req.body.model,
                    size: req.body.size,
                    condition: req.body.condition,
                    assignedID: req.body.assignedID === '' ? user.id : req.body.assignedID
                });

                Object.assign(gpu, gpuUpdate);
                gpu.save();
                res.redirect(webPage);
            }
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while updating data..."});
    }
}

const deleteGPU = async (req, res, webPage) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const gpu = await Gpu.findById(id);

            if (!gpu) {
                res.status(400).send({message: "Data not found..."});
            } else {
                gpu.deleteOne();
                res.redirect(webPage);
            }
        } else {
            res.status(400).send({message: "ID is required..."});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data for deletion..."});
    }
}

module.exports = {
    getGPUandRender,
    createGPUandSave,
    getGPUandUpdate,
    deleteGPU
}