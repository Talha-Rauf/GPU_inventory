const path = require("path");
const uploadS3 = require("../cloud/uploadToS3");

const uploadImage = (image, userID) => {
    image.mv("../../public/avatars/" + userID + path.extname(image.name).toLowerCase()).then(function (results){
        console.log(results);
        uploadS3(image, userID);
    });
}

module.exports = {
    uploadImage
}