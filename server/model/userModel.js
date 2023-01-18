const mongoose = require("mongoose");

var mySchema = new mongoose.Schema({

    Name:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Gender: String,
    Status: String
});

module.exports = mongoose.model('user', mySchema);
