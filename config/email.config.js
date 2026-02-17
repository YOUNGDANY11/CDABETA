const nodemailer = require('nodemailer');

let transporter;

function getEmailTransporter() {
  if (transporter) return transporter;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Faltan GMAIL_USER o GMAIL_APP_PASSWORD en variables de entorno');
  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error('Error verificando SMTP:', error);
    } else {
      console.log('SMTP listo para enviar correos');
    }
  });

  return transporter;
}

module.exports = { getEmailTransporter };