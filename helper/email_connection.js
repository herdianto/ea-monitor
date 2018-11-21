var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'herdi.itt@gmail.com',
    pass: '*851849851849*'
  }
});

module.exports = transporter;

