const mongoose = require("mongoose");

var mySchema = new mongoose.Schema({

    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    gender: String,
    status: String
});

module.exports = mongoose.model('user', mySchema);
