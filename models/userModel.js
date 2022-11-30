const mongoose = require("../database");
const schema = mongoose.Schema;

var userSchema = new schema({
            name: String,
            email: String
        });

var userModel = mongoose.model('users', userSchema);

module.exports = userModel;
