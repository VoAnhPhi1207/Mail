const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
require('dotenv').config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ulatroithatlavailon@gmail.com',
        pass: "yjap buix iyom brvc",
    },
});

function sendWelcomeEmail(to, name, confirmLink) {
    const templatePath = path.join(__dirname, '../template/OTP.html');
    const source = fs.readFileSync(templatePath, 'utf8');
    const compiledTemplate = handlebars.compile(source);
    const htmlToSend = compiledTemplate({ name, confirm_link: confirmLink });

    const mailOptions = {
        from: `"Hệ thống FIORA"<${process.env.EMAIL_USER}>`,
        to,
        subject: 'Xác nhận tài khoản',
        html: htmlToSend,
    };

    return transporter.sendMail(mailOptions);
}

module.exports = { sendWelcomeEmail };
