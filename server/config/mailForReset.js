const mailOptions = (user) =>
{
    return {
        from: 'no-reply@inventory_nodejs.com', // verified sender email
        to: user.email, // recipient email
        subject: "PASSWORD RESET LINK", // Subject line
        text: "Kindly click the link below for resetting your password!" + "\n" +
            "http://localhost:3000/password-reset/" + user.id + "\n\n", // plain text body
        html: '<p>Click <a href="http://localhost:3000/password-reset/' + user.id + '">here</a> to reset your password</p>', // html body
    };
};

module.exports = mailOptions;