const services = require("./userService");
const bcrypt = require("bcrypt");
const {User} = require("../model");

exports.isUsernameAndPasswordEmpty = async (req, res, next) => {
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

exports.isUserAlreadyInDB = async (req, res, next) => {
    try {
        let user = findByEmail(req.body.email);

        if (user == null) {
            return next();
        }
        else {
            res.status(400).send({message: `The email: ${user.email} already has an existing account...`});
        }
    } catch (err) {
        res.status(500).send({message: err.message || "Error occurred while retrieving Data for authentication..."});
    }
}

exports.isUserAndPasswordCorrect = async (email, password, done) => {
    console.log(email);
    const user = await services.findByEmail(email);
    console.log(user);
    if(!user){
        return done(null, false, {message: 'No user with that email!'});
    }

    try{
        if (await bcrypt.compare(password, user.password)) {
            return done(null, user);
        }
        else{
            return done(null, false, {message: 'Password incorrect!'});
        }
    }
    catch (err){
        return done(err);
    }
}
