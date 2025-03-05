const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret");
const ExpressError = require("./expresserror");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

const sendEmail = async (emailData) => {
  try {
    const options = {
      from: smtpUsername, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    const info = await transporter.sendMail(options);
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    throw new ExpressError(409, "Failed, to send verification email.");
  }
};

module.exports = sendEmail;
