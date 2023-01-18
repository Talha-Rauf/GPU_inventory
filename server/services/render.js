const axios = require('axios')

const viewAddUserPage = function (req, res){
    res.render('addNewUser');
}

const viewUpdateUserPage = function (req, res){
    res.render('editUserInfo');
}

const viewDeleteUserPage = function (req, res){
    res.render('editUserInfo');
}

module.exports = {
    viewAddUserPage,
    viewUpdateUserPage,
    viewDeleteUserPage
}