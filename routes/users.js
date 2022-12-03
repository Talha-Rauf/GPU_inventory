var express = require('express');
var mongoose = require('mongoose');
var userModel = require('../models/userModel');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { page_title: 'Add User' });
});

router.post('/insert-user', function(req, res, next) {

    req.assert('name', 'Name is required').notEmpty()
    req.assert('email', 'Email is required').isEmail()

    var errors = req.validationErrors()

    if( !errors ) {


      var userDetails = new userModel({
        name: req.body.name,
        email: req.body.email,
      });

      userDetails.save((err, doc) => {
            if (!err)
                {req.flash('success', 'Data added.');
                res.redirect('/');}
            else {
                console.log(err);
                }
      });

    }
    else {
        var errorInfo = ''
        errors.forEach(function(error) {
            errorInfo += error.msg + '<br>'
        })
        req.flash('error', errorInfo)

        res.render('/', {
            page_title: 'Data added',
            name: req.body.name,
            email: req.body.email
        })
    }
});

module.exports = router;
