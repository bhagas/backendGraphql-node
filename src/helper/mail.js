const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tump.store@gmail.com',
      pass: 'skicvwwasyydpieu'
    }
  });
  
  const mailOptions = {
    from: 'tump.store@gmail.com',
    to: 'tatawedha@gmail.com',
    subject: 'Subject',
    text: 'Email content'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
   console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });