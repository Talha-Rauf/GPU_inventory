const mailOptions = (user) =>
{
    return {
        from: 'no-reply@inventory_nodejs.com', // verified sender email
        to: user.email, // recipient email
        subject: "NEW ACCOUNT CREATED", // Subject line
        text:
            "New account create for: " + user.firstName + " " + user.lastName + ".\n" +
            "Before using your account kindly reset your password with the given link below." +
            "Kindly click the link below for resetting your password!" + "\n" +
            "http://localhost:3000/password-reset/" + user.id + "\n\n", // plain text body
        html:
            `<p>New account create for:` + user.firstName + ` ` + user.lastName + `.<br>` +
            `Before using your account kindly reset your password with the given link below.` +
            'Click <a href="http://localhost:3000/password-reset/' +
            user.id + '">here</a> to reset your password</p>', // html body
    };
};

module.exports = mailOptions;