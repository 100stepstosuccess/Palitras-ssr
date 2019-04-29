const nodemailer = require("nodemailer");
require("../config/config");

const from = '"productivity" <info@productivity.com>';

function setup() {
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
}

exports.sendConfirmationEmail = (user, token) => {
  const transport = setup();

  const email = {
    from,
    to: user.email,
    subject: "Welcome to Productivity",
    html: `<p>Welcome to Productivity, please confirm your email</p>
    <a href=${user.generateConfirmationUrl(token.token)}>Confirm</a>
    `
  };

  transport.sendMail(email, err => {
    if (err) console.log(err); //client message
  });
};

exports.sendResetPasswordEmail = user => {
  const transport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset password",
    text: `to reset password follow this link
    ${user.generateResetPasswordUrl()}  //TODO
    `
  };

  transport.sendMail(email);
};
