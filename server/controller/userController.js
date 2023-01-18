const {User} = require('../model/index');
const services = require('../services/render');

// view user(s)
const getAllUsers = function (req, res){
    console.log('in getAllUsers function');
    User.find()
        .then(data => {
            console.log(data)
            res.render('usersInfoPage', {users: data})
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error occured while retrieveing all users..."});
        });

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
        res.status(500).send({message: err.message || "Error occured while retrieveing user..."});
    }
}

// create new user
const addUser = function (req, res){

    if(!req.body){
        res.status(400).send({message:'Content cannot be empty!'});
        return;
    }

    const user = new User({
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
const updateUser = async (req, res) => {

    if(!req.body){
        res.status(400).send({message:'Content cannot be empty!'});
    }
    else{
        const user = await User.findById(req.params.id);

        if(!user){
            res.status(400).send({message: "User not found..."});
        }
        else{
            Object.assign(user, req.body);
            user.save();
            await getAllUsers(req, res);
        }
    }

    const id = req.params.id;

    User.findByIdAndUpdate(id, req.body, {userFindAndModify:false})
        .then(data => {
            if(!data){
                res.status(404).send({message: `User not found or given id:${id} is wrong...`});
            }
            else{
                res.create(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: "Error updating user info..."})
        })

}

// Delete a user
const deleteUser = function(req, res){
    User.deleteOne({_id:req.param.id});
}

module.exports = {
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
}