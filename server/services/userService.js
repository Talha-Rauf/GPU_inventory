const {User} = require('../model/index');

const createUserAndSave = async (req, res, webPage) => {
    try{
        if(!req.body){
            res.status(400).send({message:'Content cannot be empty!'});
        }
        else{
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                gender: req.body.gender,
                status: req.body.status
            });

            if (!user) {
                res.status(400).send({message: "User data missing..."});
            }
            else {
                user.save();
                res.redirect(webPage);
            }
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while saving user..."});
    }
}

const getAllByIDAndRender = async (req, res, webPage) => {
    try {
        const data = await User.find();

        if (!data) {
            res.status(400).send({message: "Data entries not found..."});
        }
        else {
            res.render(webPage, {users: data});
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving all data..."});
    }
}
const getByIDAndRender = async (req, res, webPage) => {
    try {
        const id = req.params.id;
        if (id) {
            const user = await User.findById(id);

            if (!user) {
                res.status(400).send({message: "Data not found..."});
            } else {
                res.render(webPage, {user});
            }
        } else {
            res.status(400).send({message: "ID is required or missing..."});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data..."});
    }
}

const getByIdAndUpdate = async (req, res, webPage) => {
    try {
        if (!req.body) {
            res.status(400).send({message: 'Content cannot be empty!'});
        }
        else {
            const user = await User.findById(req.params.id);

            if (!user) {
                res.status(400).send({message: "Data is missing or not found..."});
            }
            else {
                Object.assign(user, req.body);
                user.save()
                res.redirect(webPage);
            }
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occured while updating data..."});
    }
}

const getByIdAndDelete = async (req, res, webPage) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                res.status(400).send({message: "Data not found..."});
            } else {
                user.deleteOne();
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
    createUserAndSave,
    getAllByIDAndRender,
    getByIDAndRender,
    getByIdAndUpdate,
    getByIdAndDelete
}