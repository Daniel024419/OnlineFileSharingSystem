const express = require('express')
const app = express()
//controller
const controller=require('./controller');
///env viriables
const dotenv = require("dotenv");
dotenv.config();
//body parser
var bodyParser = require('body-parser');
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: true })
//flash connect
//const flash = require('connect-flash');
//app.use(flash());
// 
app.use(bodyParser.json());
app.use(urlencodedParser);
//path
const path = require('path');

// Requiring express-zip for downloading a zip file
const zip = require('express-zip');

//session
const session = require('express-session');
//const flash = require('connect-flash');
const cookieParser = require("cookie-parser");
// Initialization cookie
app.use(cookieParser());
app.use(express.json());
// Set EJS as templating engine
app.set('view engine', 'ejs');

// time to live for cookies
const oneDay=100*60*60*24;
app.use(session({
	secret: process.env.SESSION_SECRET,
	saveUninitialized: true,
	resave: true,
  cookie:{maxAge:oneDay},
}));



//defined port or 3000
const port = process.env.PORT || 3030

// Static Middleware
// styles":
app.use(express.static(path.join(__dirname, 'public', 'css')));
// js files":
app.use(express.static(path.join(__dirname, 'public', 'js')));
//global files
app.use(express.static(path.join(__dirname, 'public', 'files')));
// audio files 
app.use(express.static(path.join(__dirname, 'public', 'files' ,'audio')));
// images files 
app.use(express.static(path.join(__dirname, 'public', 'files' ,'images')));
// pdf files 
app.use(express.static(path.join(__dirname, 'public', 'files' ,'pdf')));
// profile files
app.use(express.static(path.join(__dirname, 'public', 'files' ,'Profile')));
app.use(express.static(path.join(__dirname, 'public', 'files' ,'staticFiles')));



 //globalizing sessions variables
app.use(controller.globalVariables);

//dashboard
//login screen as index
app.get('/',controller.index);
//register screen /get
app.get('/login',controller.login);
//auth /login screen
app.post('/auth',urlencodedParser,controller.auth);
//register screen /post
app.post('/register',urlencodedParser,controller.register);
//admin route
app.get('/dashboard',controller.dashboard);
//admin view files
app.get('/files',controller.filesView);
//admin file  upload route
app.post('/file-upload',urlencodedParser,controller.fileUpload);
//admin delete file
app.get('/delete/file/:fileId',controller.deleteFile);
//admin edit file
app.get('/edit-file/:fileId',controller.editFile);
//admin preview file
app.get('/preview-file/:fileId',controller.filePreview);
//admin update file upload
app.post('/update-file',urlencodedParser,controller.fileUpdate);
//emptydownload
app.get('/truncate/files',controller.emptyfiles);

 //admin view downloads
app.get('/downloads',controller.viewDownloads);
//admin delete users
app.get('/delete/download/history/:fileId',controller.deleteDownload);
//emptydownload
app.get('/truncate/downloads',controller.emptydownload);


//end
//admin view companines
app.get('/companies',controller.viewCompanines);
// admin delete company
app.get('/company/delete/:comp_id',controller.deleteCompany);
//admin add company
app.post('/add/comapny',urlencodedParser,controller.addCompany);
// end
// /truncate/companies
app.get('/truncate/downloads',controller.emptycompanies);

//departments
app.get('/department',controller.viewDepartment);
//admin add dept
app.post('/add-department',urlencodedParser,controller.addDepartment);
// delete departments
app.get('/dept/delete/:dept_id',controller.deleteDepartment);
//emptydepartment
app.get('/truncate/department',controller.emptydepartment);

//admin view users
app.get('/users',controller.viewUsers);
//admin delete users
app.get('/delete/user/:userId',controller.deleteUsers);
//emptyusers
app.get('/truncate/users',controller.emptyusers);


//admin view logs
app.get('/logs',controller.viewLogs);


//admin delete logs get
app.get('/delete/log/:id',controller.deletelog);

//admin empty logs get
app.get('/truncate/logs',controller.emptylogs);

//admin view /error-logs
app.get('/error-logs',controller.viewErrLogs);
// delete_Errlog
//admin delete err logs get
app.get('/delete/error_log/:id',controller.delete_Errlog);
//admin empty err logs get
app.get('/truncate/error_logs',controller.emptyerror_logs);
//admin Profile
app.get('/edit/admin/profile',controller.adminProfile);


// customer
//user index page
app.get('/home',controller.Customerhome);
//user Profile
app.get('/edit/user/profile',controller.userProfile);

//user file download

app.get('/download/file/:fileName/:id/:fileId',controller.downloadFile);
//logout
app.get('/logout',controller.logout);

//  account
//forget password get
app.get('/forgot/password',controller.forgotPassword);

//post 
//forget password
app.post('/account/verification',urlencodedParser,controller.accountVerification);

//jwt verification token get
app.get('/verify/:token/:userId',controller.verifyJwt);

//send jwt verification token get
app.get('update/password/:userId',controller.verifyJwt);

//update password
//post
app.post('/update/password',urlencodedParser,controller.updatePassword);

//user share file get
app.get('/share/file/:fileName/:id/:fileId',controller.shareFile);

//post  send file
app.post('/send/file',urlencodedParser,controller.sendFile);



// error response 404
app.use("",controller.error_404);

//running here
app.listen(port, () => {
  console.log(`Application is listening on port ${port}`);
})