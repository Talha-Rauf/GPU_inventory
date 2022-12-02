const mongoose = require("../database");

const mySchema = {
            Name: String,
            Email: String
        };

var userModel = mongoose.model('user', mySchema);

module.exports = userModel;
