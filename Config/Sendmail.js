const nodemailer = require("nodemailer");
require("dotenv").config();

let adminEmail = process.env.ADMIN_EMAIL

const SendMail = (data) => {
  let { recipientEmail, subject, html } = data;
  recipientEmail = recipientEmail || adminEmail || "support@easygocarz.com";
  const transporter = nodemailer.createTransport({
    host: "smtppro.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "support@easygocarz.com",
      pass: "b4EuWkUgeADa",
    },
  });
  const mailOptions = {
    from: "support@easygocarz.com",
    to: recipientEmail, //email of user
    subject: subject || "Easy Go Carz Email Test",
    html: html || "<h1>Email Notification</h1>",
    priority: "high",
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent:", info.response, "to", recipientEmail);
    }
  });
};

module.exports = SendMail;
