const mongoose = require("mongoose");

const mySchema = {
            Name: String,
            Email: String
        };

module.exports = mongoose.model('user', mySchema);
