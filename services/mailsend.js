const nodemailer = require('nodemailer');

const emailConfig = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.PASSWORD,
    }
});

module.exports = emailConfig;


