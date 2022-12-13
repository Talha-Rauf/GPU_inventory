const mongoose = require("mongoose");

const mySchema = {
            Company: String,
            Model: String,
            Processor: String,
            Cores: Number,
            Memory: String,
            Type: String,
            Details: String
        };

var userModel = mongoose.model('gpu', mySchema);

module.exports = userModel;
