const nodemailer = require("nodemailer");
const config = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.user,
    pass: config.pass,
  },
});

const sendMail = (email, subject, html) => {
  const mailerOption = {
    from: config.user,
    to: email,
    subject,
    html,
  };

  return transporter.sendMail(mailerOption);
};

module.exports = sendMail;
