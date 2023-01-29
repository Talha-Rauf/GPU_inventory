const auth = require('../services/authService');

const verifyAuthValidFields = async (req, res, next) => {
    await auth.isUsernameAndPasswordEmpty(req, res, next);
}

const verifyUserAlreadyExists = async (req, res, next) => {
    await auth.isUserAlreadyInDB(req, res, next);
}


module.exports = {
    verifyAuthValidFields,
    verifyUserAlreadyExists,
}