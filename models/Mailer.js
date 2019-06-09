const nodemailer = require("nodemailer");
require("../config/base");

class Mailer {
  constructor(from) {
    this.transporter = this._setup();
    this.from = '"picture" <info@picture.com>';
  }

  sendConfirmation(user, token) {
    const email = {
      from: this.from,
      to: user.email,
      subject: "Welcome to Picture",
      html: `<p>Welcome to Picture, please confirm your email</p>
      <a href=${user.generateConfirmationUrl(token.value)}>Confirm</a>
      <a href="http://localhost:3000/confirmation">Confirm1</a>
      `
    };

    return this.transporter.sendMail(email);
  }

  sendResetPassword(user) {
    const email = {
      from: this.from,
      to: user.email,
      subject: "Reset password",
      text: `to reset password follow this link
        ${user.generateResetPasswordUrl()}  //TODO
      `
    };

    this.transporter.sendMail(email);
  }

  _setup() {
    return nodemailer.createTransport({
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
      }
    });
  }
}

module.exports = new Mailer();
