const axios = require('axios')

const viewAddUserPage = function (req, res){
    res.render('addNewUser');
}

const viewUpdateUserPage = function (req, res){
    res.render('editUserInfo', {user: req.query.id});
}

const viewDeleteUserPage = function (req, res){
    res.render('editUserInfo');
}

module.exports = {
    viewAddUserPage,
    viewUpdateUserPage,
    viewDeleteUserPage
}