var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ashleyferns0407@gmail.com',
    pass: 'JULO2802'
  }
});

var mailOptions = {
  from: 'ashleyferns0407@gmail.com',
  to: 'ashleyferns0407@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});