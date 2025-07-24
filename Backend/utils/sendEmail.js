// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'aaron84@ethereal.email',
        pass: 'ETdwF5N2D5gNqgMeD3'
    }
});

  return transporter.sendMail({
    from: '"My App" <no-reply@myapp.com>',
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
