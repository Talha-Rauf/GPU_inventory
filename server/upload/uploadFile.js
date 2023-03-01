const multer = require("multer");
const path = require("path");

const upload = multer({
    dest: __dirname + "/avatars/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const uploadImage = async (image, userID) => {
    await image.mv("../../img" + "/avatars/" + userID + path.extname(image.name).toLowerCase());
}

const uploadMyImage = async (image, userID) => {
    await image.mv("../../img" + "/avatars/" + userID + path.extname(image.name).toLowerCase());
}

module.exports = {
    uploadImage,
    uploadMyImage
}