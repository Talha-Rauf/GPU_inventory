const userDB = require('../model/index');
const axios = require('axios')

// view user(s)
const viewAllUsers = function (req, res){

    userDB.User.find()
        .then(data => {
            console.log(data)
            res.render('usersInfoPage', {users: data})
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retrieveing all users..."});
        });

}

const viewUser = function (req, res){

    if(req.query.id){
        const id = req.query.id;

        userDB.User.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message: "User not found..."})
                }
                else{
                    res.render('usersInfoPage', {user: data})
                }
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Error occured while retrieveing user..."});
            });
    }

}

// create new user
const addUser = function (req, res){

    res.render('../views/addNewUser');

    if(!req.body){
        res.status(400).send({message:'Content cannot be empty!'});
        return;
    }

    const user = new userDB.User({
        Name: req.body.name,
        Email: req.body.email,
        Gender: req.body.gender,
        Status: req.body.status
    });

    user
        .save(user)
        .then(data => {
            res.redirect('/users/add-user')
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
}

module.exports = {
    viewAllUsers,
    viewUser,
    addUser,
    updateUser,
    deleteUser,
}