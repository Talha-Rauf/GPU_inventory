const crypto = require("crypto");

const encryptPassword = async (req, res, pass) => {
    let password = pass;
    if (password) {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
        password = salt + "$" + hash;
        return password;
    }
    else{
        return {};
    }
}

module.exports = {
    encryptPassword,
}