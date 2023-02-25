const transporter = nodemailer.createTransport({
    host: "Gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
});