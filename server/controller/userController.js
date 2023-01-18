const userDB = require('../model/index');
const services = require('../services/render');

// view user(s)
const getAllUsers = function (req, res){

    userDB.User.find()
        .then(data => {
            console.log(data)
            res.render('usersInfoPage', {users: data})
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retrieveing all users..."});
        });

}

const getUser = function (req, res){

    if(req.query.id){
        const id = req.query.id;

        userDB.User.findById(id)
            .then(data => {
                if(!data){
                    res.status(404).send({message: "User not found..."})
                }
                else{
                    res.render('selectedUserInfo', {user: data})
                }
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Error occured while retrieveing user..."});
            });
    }

}

// create new user
const addUser = function (req, res){

    if(!req.body){
        res.status(400).send({message:'Content cannot be empty!'});
        return;
    }

    const user = new userDB.User({
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status
    });

    console.log(user.name)

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
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
}