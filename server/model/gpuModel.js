const mongoose = require("mongoose");

var mySchema = new mongoose.Schema({

    Company:{
        type: String,
        required: true
    },
    Model:{
        type: String,
        required: true
    },
    Size:{
        type: String,
        required: true
    },
    assignedID:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('gpu', mySchema);