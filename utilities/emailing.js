const nodemailer = require("nodemailer");

const sendMail = async (options) =>  {

    const testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    secure: false, 
    auth: {
      user: process.env.SMPT_USERNAME, 
      pass: process.env.SMPT_PASSWORD, 
    },
  });

 
  let message = {
    from: `${process.env.SMPT_NAME} <${process.env.SMPT_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  const info = await transporter.sendMail(message);

  console.log("Message sent: %s", info.messageId);
};


module.exports = sendMail;
