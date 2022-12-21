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

module.exports = mongoose.model('gpu', mySchema);
