const path = require("path");

const uploadImage = (image, userID) => {
    image.mv("./public/avatars/" + userID + path.extname(image.name).toLowerCase()).then(function (results){
        console.log(results);
    });
}

module.exports = {
    uploadImage
}