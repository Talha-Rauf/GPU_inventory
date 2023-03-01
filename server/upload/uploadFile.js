const multer = require("multer");
const path = require("path");

const upload = multer({
    dest: __dirname + "/avatars/"
    // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

const uploadImage = async (image, userID) => {
    await image.mv(__dirname + "/avatars/" + userID);
}

const uploadMyImage = async (image, userID) => {
    upload.single("file" /* name attribute of <file> element in your form */);
    const tempPath = image.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");

    let extensionName = path.extname(image.originalname).toLowerCase();
    if (extensionName === ".png" || extensionName === ".jpg") {
        fs.rename(tempPath, targetPath, err => {
            if (err) return true;
        });
    } else {
        fs.unlink(tempPath, err => {
            if (err) return false;
        });
    }
}

module.exports = {
    uploadImage,
    uploadMyImage
}