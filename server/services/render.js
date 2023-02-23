const {User, Gpu} = require('../model/index');
const passport = require("passport");

// Rendering Authentication Pages
const viewHomePage = (req, res) => {
    res.render('index');
}

const viewLoginPage = (req, res) => {
    res.render('loginPage', { errorMessage: '' });
}

const viewSignUpPage = (req, res) => {
    res.render('signUpPage', { errorMessage: '' });
}

// Rendering User Inventory Pages
const viewAddUserPage = (req, res) => {
    res.render('addNewUser');
}

const viewUpdateUserPage = async (req, res) => {

    try {
        if (req.params.id) {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                res.status(400).send({message: "User not found..."});
            } else {
                res.render('editUserInfo', {user});
            }
        }
        else{
            res.status(400).send({message: "ID is required..."});
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving user for editing..."});
    }
}

const viewUpdateUserSelfPage = async (req, res) => {

    try {
        const user = passport.session.user;
        if (user) {

            if (!user) {
                res.status(400).send({message: "User not found..."});
            } else {
                res.render('editUserSelf', {user});
            }
        }
        else{
            res.status(400).send({message: "ID is required..."});
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving user for editing..."});
    }
}

const viewDeleteUserPage = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                res.status(400).send({message: "User not found..."});
            } else {
                res.render('confirmUserDeletion', {user});
            }

        } else {
            res.status(400).send({message: "ID is required..."});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving user for deletion..."});
    }
}

// Rendering User-page
const viewUserPage = async (req, res) => {
    let gpu = await Gpu.find().sort('model');
    let user = passport.session.user;
    res.render('userPage', {user, gpu});
}

// Rendering GPU Inventory Pages
const addGPUPage = async (req, res, webpage) => {
    try {
        if (passport.session.user) {
            let data = await User.find().sort('firstName');
            let user = passport.session.user;

            if (!data) {
                res.status(400).send({message: "Data not found..."});
            } else {
                res.render(webpage, {users: data, user: user});
            }
        }
        else{
            res.status(400).send({message: "ID is required..."});
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data for page..."});
    }
}

const editGPUPage = async (req, res, webpage) => {

    try {
        if (req.params.id) {
            let user = passport.session.user;
            let gpu = await Gpu.findById(req.params.id);
            let data = await User.find().sort('firstName');

            if (!gpu) {
                res.status(400).send({message: "Data not found..."});
            } else {
                res.render(webpage, {gpu: gpu, user: user, users: data});
            }
        }
        else{
            res.status(400).send({message: "ID is required..."});
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data for editing..."});
    }
}

const viewDeleteGPUPage = async (req, res, webpage) => {
    try {
        if(req.params.id) {
            const gpu = await Gpu.findById(req.params.id);

            if (!gpu) {
                res.status(400).send({message: "Data not found..."});
            } else {
                res.render(webpage, {gpu});
            }

        } else {
            res.status(400).send({message: "ID is required..."});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving data for deletion..."});
    }
}

module.exports = {
    viewHomePage,
    viewLoginPage,
    viewSignUpPage,
    viewAddUserPage,
    viewUpdateUserPage,
    viewUpdateUserSelfPage,
    addGPUPage,
    editGPUPage,
    viewDeleteUserPage,
    viewDeleteGPUPage,
    viewUserPage
}
