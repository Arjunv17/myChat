const Controller = require('../controllers/index');
const express = require('express');
const app = express();
const router =express.Router();
const nodemailer = require("nodemailer");
const { getMaxListeners } = require('../route');
const Mail = require('nodemailer/lib/mailer');

// async..await is not allowed in global scope, must use a wrapper
async function sendMailToUser(email,subject,emailBody) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "arjunverma870@gmail.com", // generated ethereal user
        pass:"Designerarjun123", // generated ethereal password
      },
    });



  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'arjunverma870@gmail.com', // sender address
    to:email, // list of receivers
    subject: subject, // Subject line
    html: emailBody, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}
// main()



module.exports = {
  sendMailToUser
}