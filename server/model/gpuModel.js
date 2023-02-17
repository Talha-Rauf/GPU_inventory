const mongoose = require("mongoose");

var mySchema = new mongoose.Schema({

    company:{
        type: String,
        required: true
    },
    model:{
        type: String,
        required: true
    },
    size:{
        type: String,
        required: true
    },
    condition:{
        type: String,
        required: true
    },
    details:{
        type: String
    },
    assignedID:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('gpu', mySchema);