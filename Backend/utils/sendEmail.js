const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html }) => {

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'else.lakin@ethereal.email',
        pass: 'bzTx7fk4pjztKMVQtR'
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
