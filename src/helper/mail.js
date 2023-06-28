const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tump.store@gmail.com',
      pass: 'skicvwwasyydpieu'
    }
  });
  
 
  
  function sendMail(to, subject, html) {
    return new Promise((resolve, reject) => {
      const mailOptions = {
        from: 'NoReply<tump.store@gmail.com>',
        to,
        subject,
        html
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       
       reject(error)
        } else {
          console.log('Email sent: ' + info.response);
          resolve()
          // do something useful
        }
      });
    })
    
  }
  
  module.exports = sendMail;