const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'dion32@ethereal.email',
        pass: 'QUFVcFam7au3hzMuSP'
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
