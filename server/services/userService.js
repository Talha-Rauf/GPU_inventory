const httpStatus = require('http-status');
const bcrypt = require("bcrypt");
const {User} = require('../model/index');
const passport = require("passport");
const ApiError = require('../utils/ApiError');
const {transporter, mailForNewUser, mailForReset, mailForConfirmation} = require("../config");
const fs = require("fs");

const queryUsers = async (filter) => {
    return await User.find().sort(filter);
}

const findByID = async (id) => {
    return await User.findById(id);
};

const findByEmail = async (email) => {
    return await User.findOne({email});
};

const createUser = async (userBody) => {
    let newUser = userBody;
    if (await User.isEmailTaken(userBody.email)) {
        return undefined;
    }
    let generatedPassword = Math.random().toString(36).slice(-8);
    let url = 'https://user-management-js.s3.us-east-2.amazonaws.com/';
    newUser.password === '...' ? await bcrypt.hash(generatedPassword, 10) : await bcrypt.hash(userBody.password, 10);
    newUser.avatarURL = url + newUser.gender + '_avatar.png';
    newUser.checkFalse = true;
    return await User.create(newUser);
}

const signUpUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        return undefined;
    }
    userBody.password = await bcrypt.hash(userBody.password, 10);
    return await User.create(userBody);
}

const updateUser = async (userID, updateBody) => {
    const user = await findByID(userID); // User found by ID in db
    const user_in_session = passport.session.user; // User logged in current session
    if (!user) {throw new ApiError(httpStatus.NOT_FOUND, 'User not found');}

    let hashedPassword = await bcrypt.hash(updateBody.password, 10);
    let url = 'https://user-management-js.s3.us-east-2.amazonaws.com/';
    const fileUrl = "../public/avatars/" + userID + ".png";
    // updateBody.gender + '_avatar.png',
    const userUpdate = new User({
        _id: user._id,
        avatarURL: fs.readFileSync(fileUrl) === undefined ? url + updateBody.gender.toLowerCase() + '_avatar.png' : url + user._id + '.png',
        firstName: updateBody.firstName,
        lastName: updateBody.lastName,
        email: updateBody.email.toLowerCase(),
        password: updateBody.password === '' ? user.password : hashedPassword,
        gender: updateBody.gender,
        status: updateBody.status,
        role: user_in_session.role === 'admin' ? updateBody.role : user.role,
        emailVerified: user_in_session.emailVerified === 'true' ? 'true' : updateBody.emailVerified,
        checkFalse: updateBody.checkFalse
    });

    Object.assign(user, userUpdate);
    await user.save();
}

const deleteUser = async (userID) => {
    const user = await findByID(userID);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.remove();
}

const changePassword = async (userID, newPassword) => {
    let hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne(
        { _id: userID },
        { $set: { password: hashedPassword } },
        { new: true }
    );
}

const changeCheckToTrue = async (userID) => {
    await User.updateOne(
        { _id: userID },
        { $set: { checkFalse: true } },
        { new: true }
    );
}

const changeCheckToFalse = async (userID) => {
    await User.updateOne(
        { _id: userID },
        { $set: { checkFalse: false } },
        { new: true }
    );
}

const changeEmailVerifyToTrue = async (userID) => {
    await User.updateOne(
        { _id: userID },
        { $set: { emailVerified: true } },
        { new: true }
    );
}

const sendEmailForPassReset = (user) => {
    transporter.sendMail(mailForReset(user), function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const sendEmailForVerification = (user) => {
    transporter.sendMail(mailForConfirmation(user), function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const sendEmailForNewUser = (user) => {
    transporter.sendMail(mailForNewUser(user), function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = {
    queryUsers,
    findByID,
    findByEmail,
    createUser,
    signUpUser,
    updateUser,
    deleteUser,
    changePassword,
    changeCheckToTrue,
    changeCheckToFalse,
    sendEmailForNewUser,
    sendEmailForPassReset,
    sendEmailForVerification,
    changeEmailVerifyToTrue
}
