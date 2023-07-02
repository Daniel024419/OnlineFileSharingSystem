const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
require('dotenv').config()
var EMAIL_USERNAME=process.env.EMAIL_USERNAME;
var PASSWORD=process.env.PASSWORD;
var CLIENT_ID=process.env.CLIENT_ID;
var CLIENT_SECRET=process.env.CLIENT_SECRET;
var REFRESH_TOKEN=process.env.REFRESH_TOKEN;


const transporter = nodemailer.createTransport({
service: 'gmail',
auth: {
  type: 'OAuth2',
  user:EMAIL_USERNAME,
  pass:PASSWORD,
  clientId:CLIENT_ID,
  clientSecret:CLIENT_SECRET,
  refreshToken:REFRESH_TOKEN
}
});


// configration
const mailConfigurations = {

    // It should be a string of sender email
    from:EMAIL_USERNAME,
    
    // Comma Separated list of mails
    to: '0720000312@ttu.edu.gh',
  
    // Subject of Email
   subject: 'Sending Email using Node.js',
    
    // This would be the text of email body
   html: "<h2>Hi! There</h2> <h5> This HTML content is being send by NodeJS along with NodeMailer.</h5>",
   attachments: [
    {  
      // utf-8 string as an attachment
      filename: 'text.txt',
      content: 'Hello, GeeksforGeeks Learner!'
    },
    {   
      // filename and content type is derived from path
      path: './files/doc.docx'
    },
    {   
      path: './files/pdf.pdf'
    }
       
  ]
  };

  
const token = jwt.sign({
		data: 'Token Data'}, 'ourSecretKey', { expiresIn: '10m' }
);	

  
//exports

module.exports={
transporter:transporter,
token:token

}