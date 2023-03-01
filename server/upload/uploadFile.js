const multer = require("multer");
const path = require("path");
const {User} = require("../model");

const upload = multer({
    dest: "./public/avatars/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const uploadImage = (image, userID) => {
    image.mv("./public/avatars/" + userID + path.extname(image.name).toLowerCase()).then(function (results){
        console.log(results);
    });
}

module.exports = {
    uploadImage
}