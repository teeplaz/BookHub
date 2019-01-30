import nodemailer from "nodemailer";
const smtpTransport = require('nodemailer-smtp-transport');

const from = '"Bookhub" <info@bookhub.com>';

function setup() {
  return nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
             user: 'testingthings15@gmail.com',
             pass: 'Qwerty!23'
         }
    }));


    // return nodemailer.createTransport({
    //   host: "smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "77b7d18d377b65",
    //     pass: "72c39fd58dc33a"
    //   }
    // });


  // return nodemailer.createTransport(smtpTransport({
  //   service: process.env.EMAIL_SERVICE,
  //   host: process.env.EMAIL_HOST,
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS
  //   }
  // }));
  

  
}

export function sendConfirmationEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Welcome to Bookworm",
    text: `
    Welcome to Bookworm. Please, confirm your email.

    ${user.generateConfirmationUrl()}
    `
  };

  tranport.sendMail(email);
}

export function sendResetPasswordEmail(user) {
  const tranport = setup();
  const email = {
    from,
    to: user.email,
    subject: "Reset Password",
    text: `
    To reset password follow this link

    ${user.generateResetPasswordLink()}
    `
  };

  tranport.sendMail(email);
}
