const mongoose = require("../database");
const Schema = mongoose.Schema;

var schema = new Schema({
    path : {type:String , required:true},
    title: {type:String , required: true}
})

var userModel = mongoose.model('users', userSchema);

module.exports = mongoose.model("Users", userModel);
