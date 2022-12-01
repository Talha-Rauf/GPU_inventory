const mongoose = require("../database");

const mySchema = {
            Company: String,
            Model: String,
            Processor: String,
            Cores: String,
            Memory: String,
            Type: String,
            Details: String
        };

var userModel = mongoose.model('gpu', mySchema);

module.exports = userModel;
