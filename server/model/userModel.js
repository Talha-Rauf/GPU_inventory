const mongoose = require("mongoose");

var mySchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    gender: String,
    status: String
});

module.exports = mongoose.model('user', mySchema);
