const nodemailer = require("nodemailer");

const sendEmail = async (to) => {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });
    const message = {
      from: "ramandeepsinghbhella@gmail.com",
      to: [to],
      subject: "You are registered to stackFusion",
      text: 'Thanks for registration.',
    };
    await transporter.sendMail(message);
  };

  module.exports = { sendEmail }