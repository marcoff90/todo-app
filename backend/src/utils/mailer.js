import nodemailer from 'nodemailer';

const sendMail = function (userEmail) {

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
  });

  let mailOptions = {
    from: process.env.MAILER_USER,
    to: userEmail,
    subject: 'Deadline notification',
    text: 'Dear user, \n'
        + "your task is about to come to deadline.\n"
        + "The task will be set to completed in 24 hours after set deadline unless you updated it's status.\n"
        + "TodoApp"
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

export default sendMail;
