const {User} = require('../model/index');
const services = require('../services/render');

// view user(s)
const getAllUsers = async (req, res) => {

    try {
            const data = await User.find();

            if (!data) {
                res.status(400).send({message: "Users not found..."});
            }
            else {
                res.render('usersInfoPage', {users: data});
            }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving all users..."});
    }
}

const getUser = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                res.status(400).send({message: "User not found..."});
            } else {
                res.render('selectedUserInfo', {user});
            }
        }
        else{
            res.status(400).send({message: "ID is required..."});
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving user..."});
    }
}

// create new user
const addUser = async (req, res) => {
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
                res.redirect('/users');
            }
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occurred while saving user..."});
    }
};

// Update a user
const updateUser = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({message: 'Content cannot be empty!'});
        }
        else {
            const user = await User.findById(req.params.id);

            if (!user) {
                res.status(400).send({message: "User data missing..."});
            }
            else {
                Object.assign(user, req.body);
                user.save()
                res.redirect('/users');
            }
        }
    }
    catch (err) {
        res.status(500).send({message: err.message || "Error occured while updating user..."});
    }
}

// Delete a user
const deleteUser = async (req, res) => {
    try {
        if (req.params.id) {
            const id = req.params.id;
            const user = await User.findById(id);

            if (!user) {
                res.status(400).send({message: "User not found..."});
            } else {
                user.deleteOne();
                res.redirect('/users');
            }
        } else {
            res.status(400).send({message: "ID is required..."});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving user for editing..."});
    }
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
}