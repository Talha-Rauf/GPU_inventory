const services = require('../services/userService');
const auth = require('../services/authService');
const passport = require("passport");
const crypto = require('crypto');

const verifyAuthValidFields = async (req, res, next) => {
    let errors = [];

    if(req.body) {
        if(!req.body.email){
            errors.push('Missing Email Field!');
        }

        if(!req.body.password){
            errors.push('Missing Password Field!')
        }

        if(errors.length){
            return res.status(400).send({errors: errors.join(', ')});
        }
        else{
            return next();
        }
    }
    else{
        return res.status(400).send({errors: 'Missing Email and Password fields!'});
    }
}

const verifyUserAndPassword = async (req, res, next) => {
    try {
        let user = services.findByEmail(req.body.email);
        console.log(user);
        if (!user[0]) {
            res.status(404).send({});
        }
        else {
            let passwordFields = user[0].password.split('$');
            let salt = passwordFields[0];
            let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest('base64');

            if (hash === passwordFields[1]) {
                req.body = {
                    userId: user[0]._id,
                    email: user[0].email,
                    provider: 'email',
                    name: user[0].firstName + ' ' + user[0].lastName,
                };
                return next();
            } else {
                res.status(400).send({message: "Invalid email or password..."});
            }
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data for authentication..."});
    }
}

const verifyUserAlreadyExists = async (req, res, next) => {
    try {
        let user = services.findByEmail(req.body.email);

        if (!user) {
            return next();
        }
        else {
            res.status(400).send({message: `The email: ${user.email} already has an existing account...`});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data for authentication..."});
    }
}

const authenticateUser = async (req, res, next) => {
    passport.authenticate('local',
        (err, user, info) => {
        console.log(info)
            if (err) {
                return next(err);
            }

            if (!user) {
                return res.redirect('/login?info=' + info);
            }

            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                }

                return res.redirect('/users');
            });

        })(req, res, next);
}

module.exports = {
    verifyAuthValidFields,
    verifyUserAndPassword,
    verifyUserAlreadyExists,
    authenticateUser
}