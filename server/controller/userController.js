const userDB = require('../model/index');
const mongoose = require('mongoose');

// view user(s)
const viewAllUsers = function (req, res){

    userDB.User.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retrieveing user..."});
        });

}

const viewUser = function (req, res){

    userDB.User.findOne(req.param.id)
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retrieveing user..."});
        });

}

// create new user
const addUser = function (req, res){

    if(!req.body){
        res.status(400).send({message:'Content cannot be empty!'});
        return;
    }

    // res.render('../views/addNewUser');

    const user = new userDB.User({
        Name: req.body.name,
        Email: req.body.email,
        Gender: req.body.gender,
        Status: req.body.status
    });

    user
        .save(user)
        .then(data => {
            res.send(data)
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "Some error occurred while creating a new user..."
            });
        });


};

// Update a user
const updateUser = function(req, res){

    if(!req.body){
        res.status(400).send({message:'Content cannot be empty!'});
        return;
    }

    const id = req.params.id;

    userDB.User.findByIdAndUpdate(id, req.body, {userFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({message: `User not found or given id:${id} is wrong...`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error updating user info..."})
        })

}

// Delete a user
const deleteUser = function(req, res){
    userDB.User.deleteOne({_id:req.param.id});
    res.render('../views/usersInfoPage');
}

module.exports = {
    viewAllUsers,
    viewUser,
    addUser,
    updateUser,
    deleteUser,
}