const nodemailer = require('nodemailer');
const crypto = require('crypto');

const generateOTP = () => crypto.randomInt(100000, 999999).toString();

const sendOTP = async (email, otp) => {

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'else.lakin@ethereal.email',
        pass: 'bzTx7fk4pjztKMVQtR'
    }
});

  await transporter.sendMail({
    from: process.env.OTP_EMAIL,
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
};

module.exports = { sendOTP, generateOTP };
