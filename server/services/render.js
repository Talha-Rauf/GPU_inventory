const {User} = require('../model/index');

const viewHomePage = (req, res) => {
    res.render('index')
}

const viewLoginPage = (req, res) => {
    res.render('loginPage')
}

const viewSignUpPage = (req, res) => {
    res.render('SignUpPage')
}

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
        res.status(500).send({message: err.message || "Error occurred while retrieving user for editing..."});
    }
}

module.exports = {
    viewHomePage,
    viewLoginPage,
    viewSignUpPage,
    viewAddUserPage,
    viewUpdateUserPage,
    viewDeleteUserPage
}