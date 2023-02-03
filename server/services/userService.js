const bcrypt = require("bcrypt");
const {User} = require('../model/index');

const createUserAndSave = async (req, res, webPage) => {
    try{
        if(!req.body){
            res.status(400).send({message:'Content cannot be empty!'});
        }
        else{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email.toLowerCase(),
                password: hashedPassword,
                gender: req.body.gender,
                status: req.body.status,
                role: req.body.role === '' ? 'user' : req.body.role
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
        const data = await User.find().sort('firstName');

        if (!data) {
            res.status(400).send({message: "Data entries not found..."});
        }
        else {
            res.render(webPage, {userID: req.params.id, users: data, "errorMessage": req.flash("ONLY ADMINS CAN PERFORM THIS ACTION!")});
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
                let hashedPassword = await bcrypt.hash(req.body.password, 10);

                const userUpdate = new User({
                    _id: user._id,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email.toLowerCase(),
                    password: req.body.password === '' ? user.password : hashedPassword,
                    gender: req.body.gender,
                    status: req.body.status,
                    role: req.body.role === '' ? 'user' : req.body.role
                });

                Object.assign(user, userUpdate);
                user.save();
                res.redirect(webPage);
            }
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while updating data..."});
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

const findByID = async (id) => {
    return await User.findById(id);
};

module.exports.findByEmail = async (email) => {
    return await User.findOne({email});
};

module.exports = {
    createUserAndSave,
    getAllByIDAndRender,
    getByIDAndRender,
    getByIdAndUpdate,
    getByIdAndDelete,
    findByID
}
