const mailOptions = (user) =>
{
    return {
        from: 'no-reply@inventory_nodejs.com', // verified sender email
        to: user.email, // recipient email
        subject: "PASSWORD RESET LINK", // Subject line
        text: "Kindly click the link below for email verification!" + "\n" +
            "http://localhost:3000/email-verification/" + user.id + "\n\n", // plain text body
        html: '<p>Click <a href="http://localhost:3000/email-verification/' + user.id + '">here</a> to verify your email.</p>', // html body
    };
};

module.exports = mailOptions;