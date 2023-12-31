//mysql
var mysql = require("mysql");
//importing connection
var importCon = require("./include/connection");
var con = importCon.con;
//
const mailHelper = require('./mailhelper');
//node mailer
const archiver = require('archiver');
//
//
var transporter = mailHelper.transporter;
var token = mailHelper.token;
var EMAIL_USERNAME = process.env.EMAIL_USERNAME;
// var user= dbuserName.toUpperCase();
// user Object as session variables
//google passport
require('./googleAuth');
//facebook
require('./facebookAuth');
// Initialize Passport and configure session support
const bcrypt = require('bcryptjs');
//files upload to storage
//multer and upload location
const multer = require("multer");
//file system
const fs = require("fs");
//path
const path = require("path");
//flash meessag
//const flash = require('connect-flash');
const axios = require('axios');
//importing mails support
const nodemailer = require('nodemailer');
// admin Object as session variables
require('dotenv').config();
//smsm
var SERVER_NAME = process.env.SERVER_NAME;
var MNOTIFY_API_KEY = process.env.MNOTIFY_API_KEY;
var SENDER_ID = process.env.SENDER_ID;
const admin_Session = {
    userId: "",
    userName: "",
    gmail: "",
    role: "",
    dept_id: "",
    comp_id: "",
    created_at: ""
};
// user Object as session variables
const user_Session = {
    userId: "",
    userName: "",
    gmail: "",
    role: "",
    dept_id: "",
    comp_id: "",
    created_at: ""
};
//globalizing sessions variables
globalVariables = (req, res, next) => {
    // admin
    res.locals.CurrentAdmin = req.session.Admin;
    // user
    res.locals.CurrentUser = req.session.User;
    res.locals.error_login = req.session.error_login;
    res.locals.error_register = req.session.error_register;
    res.locals.success_register = req.session.success_register;
    res.locals.error_forgot_pass = req.session.error_forgot_pass;
    res.locals.success_forgot_pass = req.session.success_forgot_pass;
    res.locals.success_update_pass = req.session.success_update_pass;
    res.locals.error_update_pass = req.session.error_update_pass;
    res.locals.verify_token = req.session.verify_token;
    res.locals.message = req.session.message;
    next();
};
//check auth for google account
authfailure = (req, res) => {
    res.send("Error");
};
//end
//success auth
authcallbacksuccess = (req, res) => {
    const email = req.user.email; // User's email
    var filData = [email];
    var sql_check_user = `SELECT * FROM users WHERE gmail = ?`;
    try {
        //get connection
        con.query(sql_check_user, filData, (err, result) => {
            if (result.length > 0) {
                //fetching user data
                result.forEach(data => {
                    userName = data.userName;
                    dbGmail = data.gmail;
                    dbPassword = data.password;
                    userId = data.userId;
                    role = data.role;
                    dept_id = data.dept_id;
                    comp_id = data.comp_id;
                    created_at = data.created_at;
                });
                //login and store session
                // logins logs
                // Returns a random integer from 0 to 99999:
                var log_id = Math.floor(Math.random() * 99999);
                var logData = [, log_id, userId, new Date()];
                var sql_user_log = `INSERT INTO logs (id,log_id,user_id,created_at) VALUE (?,?,?,?)`;
                con.query(sql_user_log, logData, (err, result) => {
                    if (result) {
                        // admin
                        if (role == 1 || role == 2) {
                            //fetching admin data
                            admin_Session.userId = userId;
                            admin_Session.userName = userName;
                            admin_Session.gmail = email;
                            admin_Session.role = role;
                            admin_Session.dept_id = dept_id;
                            admin_Session.comp_id = comp_id;
                            admin_Session.created_at = created_at;
                            //save session admin
                            req.session.Admin = admin_Session;
                            req.session.save();
                            const sessionadmin = req.session.Admin;
                            console.log(sessionadmin);
                            res.redirect("/dashboard");
                        } else if (role == 0) {
                            //fetching admin data
                            user_Session.userId = userId;
                            user_Session.userName = userName;
                            user_Session.gmail = email;
                            user_Session.role = role;
                            user_Session.dept_id = dept_id;
                            user_Session.comp_id = comp_id;
                            user_Session.created_at = created_at;
                            //save session user
                            req.session.User = user_Session;
                            req.session.save();
                            const sessionuser = req.session.User;
                            console.log(sessionuser);
                            // customer
                            res.redirect("/home");
                        } else {
                            var error_messsage = "Account does not have any role.";
                            req.session.error_login = error_messsage;
                            req.session.save();
                            res.redirect("/login");
                        }
                    }
                    if (err) throw err;
                });
            } else {
                //error logs
                // Returns a random integer from 0 to 99999:
                var log_id = Math.floor(Math.random() * 99999);
                var errorlogData = [, log_id, req.user.email, "auth faild", new Date()];
                var sql_user_error_log = `INSERT INTO error_logs (id,log_id,gmail,password,created_at)
          VALUES (?,?,?,?,?)`;
                con.query(sql_user_error_log, errorlogData, (err, result) => {
                    if (result) {
                        var error_messsage = "Wrong credentials,Sign up first";
                        req.session.error_login = error_messsage;
                        req.session.save();
                        res.redirect("/login");
                    }
                    if (err) throw err;
                });
            }
        });
    } catch (error) {
        console.log("Can not select db....");
    }
};
//index screen page get  /signnup get
index = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId && admin_Session.role) {
        //console.log(admin_Session.userId);
        res.redirect('/dashboard');
    } else if (user_Session.userId && user_Session.role) {
        res.redirect('/home');
    } else {
        //company
        var sql_select_company = `SELECT * FROM company;SELECT * FROM users;SELECT * FROM department`;
        //catching blockages
        try {
            // con.query(sql_select_company, (err, result_company, fields) => {
            // con.query(sql_select_email, (err, result_check, fields) => {
            con.query(sql_select_company, (err, result_department, fields) => {
                if (result_department) {
                    res.render("../views/login.ejs", {
                        result_company: result_department[0],
                        result_check: result_department[1],
                        result_department: result_department[2]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            //   });
            // });
        } catch (error) {
            console.log("can not select....");
            console.log(error);
        }
        req.session.destroy();
    }
};
//auth screen page /post
//after login
auth = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading form data.");
        }
        //catching blockages
        try {
            //inserting
            //checking sql injection
            var gmail = mysql.format(req.body.email);
            var password = mysql.format(req.body.password);
            var dbGmail,
                dbPassword,
                userId,
                role,
                userName,
                dept_id,
                comp_id,
                created_at;
            //var filData = [gmail, password];
            var filData = [gmail];
            var sql_check_user = `SELECT * FROM users WHERE gmail = ?`;
            //var sql_check_user = `SELECT * FROM users WHERE gmail = ? AND PASSWORD = ?`;
            //get connection
            con.query(sql_check_user, filData, (err, result) => {
                if (result) {
                    //fetching user data
                    result.forEach(data => {
                        userName = data.userName;
                        dbGmail = data.gmail;
                        dbPassword = data.password;
                        userId = data.userId;
                        role = data.role;
                        dept_id = data.dept_id;
                        comp_id = data.comp_id;
                        created_at = data.created_at;
                    });
                    //decrption of the hashed password
                    //bcrypt for the hash password
                    //check for empty string
                    if (password && dbPassword) {
                        if (dbPassword != '' && password != '') {
                            bcrypt.compare(password, dbPassword, async function(err, verified) {
                                if (err) throw err;
                                if (verified) {
                                    // logins logs
                                    // Returns a random integer from 0 to 99999:
                                    var log_id = Math.floor(Math.random() * 99999);
                                    var logData = [, log_id, userId, new Date()];
                                    var sql_user_log = `INSERT INTO logs (id,log_id,user_id,created_at) VALUE (?,?,?,?)`;
                                    con.query(sql_user_log, logData, (err, result) => {
                                        if (result) {
                                            // admin
                                            if (role == 1 || role == 2) {
                                                //fetching admin data
                                                admin_Session.userId = userId;
                                                admin_Session.userName = userName;
                                                admin_Session.gmail = gmail;
                                                admin_Session.role = role;
                                                admin_Session.dept_id = dept_id;
                                                admin_Session.comp_id = comp_id;
                                                admin_Session.created_at = created_at;
                                                //save session admin
                                                req.session.Admin = admin_Session;
                                                req.session.save();
                                                const sessionadmin = req.session.Admin;
                                                console.log(sessionadmin);
                                                res.redirect("/dashboard");
                                            } else if (role == 0) {
                                                //fetching admin data
                                                user_Session.userId = userId;
                                                user_Session.userName = userName;
                                                user_Session.gmail = gmail;
                                                user_Session.role = role;
                                                user_Session.dept_id = dept_id;
                                                user_Session.comp_id = comp_id;
                                                user_Session.created_at = created_at;
                                                //save session user
                                                req.session.User = user_Session;
                                                req.session.save();
                                                const sessionuser = req.session.User;
                                                console.log(sessionuser);
                                                // customer
                                                res.redirect("/home");
                                            } else {
                                                var error_messsage = "Account does not have any role.";
                                                req.session.error_login = error_messsage;
                                                req.session.save();
                                                res.redirect("/login");
                                            }
                                        }
                                        if (err) throw err;
                                    });
                                    //end
                                } else {
                                    //error logs
                                    // Returns a random integer from 0 to 99999:
                                    var log_id = Math.floor(Math.random() * 99999);
                                    var errorlogData = [, log_id, gmail, password, new Date()];
                                    var sql_user_error_log = `INSERT INTO error_logs (id,log_id,gmail,password,created_at)
          VALUES (?,?,?,?,?)`;
                                    con.query(sql_user_error_log, errorlogData, (err, result) => {
                                        if (result) {
                                            var error_messsage = "Wrong password, Try again";
                                            req.session.error_login = error_messsage;
                                            req.session.save();
                                            res.redirect("/login");
                                        }
                                        if (err) throw err;
                                    });
                                }
                            });
                        } else {
                            var error_messsage = "Account does not exist.";
                            req.session.error_login = error_messsage;
                            req.session.save();
                            res.redirect("/login");
                        }
                    } else {
                        console.log("system clashed..");
                        var error_messsage = "Please , Try logging in again.";
                        req.session.error_login = error_messsage;
                        req.session.save();
                        res.redirect("/login");
                    }
                    //end if
                    // end for verification
                } else {
                    var error_messsage = "Account does not exist.";
                    req.session.error_login = error_messsage;
                    req.session.save();
                    res.redirect("/login");
                }
            });
            //releasing connection,when done using it
        } catch (error) {
            console.log("can not insert....");
        }
        //end
    });
};
//login screen page /get
//login screen page /get
login = (req, res) => {
    if (admin_Session.userId != '' && admin_Session.role != '') {
        res.redirect('/dashboard');
    } else if (user_Session.userId != '' && user_Session.role != '') {
        res.redirect('/home');
    } else {
        // res.render("../views/login.ejs");
        //company
        var sql_select_company = `SELECT * FROM company;SELECT * FROM users;SELECT * FROM department`;
        //catching blockages
        try {
            // con.query(sql_select_company, (err, result_company, fields) => {
            // con.query(sql_select_email, (err, result_check, fields) => {
            con.query(sql_select_company, (err, result_department, fields) => {
                if (result_department) {
                    res.render("../views/login.ejs", {
                        result_company: result_department[0],
                        result_check: result_department[1],
                        result_department: result_department[2]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            //   });
            // });
        } catch (error) {
            console.log("can not select....");
            console.log(error);
        }
        req.session.destroy();
    }
};
//register screen page /post
register = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading form data.");
        }
        //checking sql injection
        //checking sql injection
        var userName = mysql.format(req.body.userName);
        var comp_id = mysql.format(req.body.company);
        console.log(comp_id);
        var dept_id = mysql.format(req.body.department);
        var tel = mysql.format(req.body.tel);
        var gmail = mysql.format(req.body.email);
        var password = mysql.format(req.body.password);
        var encrptypass = '';
        //var fileName = req.file.filename;
        // var ext = path.extname(req.file.path);
        // var fileSize = req.file.size;
        //encrption of the string password
        bcrypt.genSalt(10, function(err, salt) {
            if (err) throw err;
            //bcrppt for the password
            bcrypt.hash(password, salt, async function(err, hashpass) {
                //log(hash);
                encrptypass = hashpass;
                //console.log(encrptypass);
                var role = 0;
                // Returns a random integer from 0 to 99999:
                var userId = Math.floor(Math.random() * 99999);
                var filData = [,
                    userId,
                    userName,
                    gmail,
                    encrptypass,
                    tel,
                    role,
                    dept_id,
                    comp_id,
                    new Date()
                ];
                var sql_insert_users = `INSERT INTO users (
                id,userId,userName,
      gmail,password,tel,role,dept_id,comp_id,created_at) 
     VALUES (?,?,?,?,?,?,?,?,?,?)`;
                //catching blockages
                try {
                    //inserting
                    //get connection
                    con.query(sql_insert_users, filData, (err, result) => {
                        if (result) {
                            var success_register = "Account created successfully,you can now login";
                            req.session.success_register = success_register;
                            // Function to send an email
                            async function sendEmailWithRefreshedToken() {
                                try {
                                    //send token after verifying password
                                    const mailConfigurations = {
                                        // It should be a string of sender/server email
                                        from: EMAIL_USERNAME,
                                        to: gmail,
                                        // Subject of Email
                                        subject: 'Admin Account Creation',
                                        // This would be the text of email body
                                        //  + user +
                                        html: `Hello ' ${userName} 
                                     ', Your account is successfully created on'  ${SERVER_NAME}
                                      ' , click here : https://easyfiles.onrender.com/ to access your account. Company ID = ' 
                                      ${comp_id} , ' Department ID = ${dept_id}`
                                    };
                                    transporter.sendMail(mailConfigurations, function(error, info) {
                                        if (error) throw Error(error);
                                        if (error) {
                                            console.log('no internet to send mail');
                                        }
                                        console.log('Email Sent Successfully');
                                        console.log(info);
                                    });
                                } catch (error) {
                                    console.error('An error occurred:', error);
                                }
                            }
                            // Initialize by sending an email
                            sendEmailWithRefreshedToken();
                            req.session.save();
                            res.redirect("/");
                        } else {
                            var error_register = "Account not created successfully,Try again";
                            req.session.error_register = error_register;
                            req.session.save();
                            res.redirect("/");
                        }
                        if (err) throw err;
                    });
                    //releasing connection,when done using it
                } catch (error) {
                    console.log("can not insert....");
                }
            });
        });
        //end
        //end
    });
};
//end
//add admin
//register screen page /post
AdddminUsers = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading form data.");
        }
        // checking sql injection
        const {
            username,
            password,
            company,
            telephone,
            department,
            email,
        } = req.body;
        var userName = username;
        var comp_id = company;
        var dept_id = department;
        var comp_id = company;
        var gmail = email;
        var tel = telephone;
        var recipientNumber = telephone;
        //here
        var encrptypass = '';
        //var fileName = req.file.filename;
        // var ext = path.extname(req.file.path);
        // var fileSize = req.file.size;
        //encrption of the string password
        bcrypt.genSalt(10, function(err, salt) {
            if (err) throw err;
            //bcrppt for the password
            bcrypt.hash(password, salt, async function(err, hashpass) {
                //log(hash);
                encrptypass = hashpass;
                //console.log(encrptypass);
                var role = 2;
                // Returns a random integer from 0 to 99999:
                var userId = Math.floor(Math.random() * 99999);
                var filData = [,
                    userId,
                    userName,
                    gmail,
                    encrptypass,
                    tel,
                    role,
                    dept_id,
                    comp_id,
                    new Date()
                ];
    var sql_insert_users = `INSERT INTO users (id,userId,userName,
      gmail,password,tel,role,dept_id,comp_id,created_at) 
     VALUES (?,?,?,?,?,?,?,?,?,?)`;
                //catching blockages
                try {
                    //inserting
                    //get connection
                    //check mail
                    var sql_check_user = `SELECT * FROM users WHERE gmail = ?`;
                    con.query(sql_check_user, gmail, (err, result_ck) => {

                        if (result_ck.length == 0) {

                            con.query(sql_insert_users, filData, (err, result) => {

                                if (result) {



                                    const message = 'Hello ' + userName + ', Your admin account is successfully added to ' + SERVER_NAME + ' , click here : https://easyfiles.onrender.com/ to access your account. ' + ' Password = ' + password + ' UserName = ' + userName + ' Company ID = ' + company + ' Department ID = ' + department;
                                    // Construct the API URL
                                    const apiUrl = `https://apps.mnotify.net/smsapi?key=${MNOTIFY_API_KEY}
                                    &to=${recipientNumber}&msg=${message}&sender_id=${SENDER_ID}`;
                                    // Send the SMS
                                    axios.get(apiUrl).then(response => {
                                        console.log('SMS sent successfully');
                                        console.log(response.data); // Optional: Log the API response
                                    }).catch(error => {
                                        console.error('Failed to send unique code SMS:', error);
                                    });
                                    res.status(200).json({
                                        message: 'Data saved successfully'
                                    });
                                    console.log("sucesss");
                                    // Function to send an email
                                    async function sendEmailWithRefreshedToken() {
                                        try {
                                            //send token after verifying password
                                            const mailConfigurations = {
                                                // It should be a string of sender/server email
                                                from: EMAIL_USERNAME,
                                                to: email,
                                                // Subject of Email
                                                subject: 'Admin Account Creation',
                                                // This would be the text of email body
                                                //  + user +
                                                html: `Hello ' ${userName} 
                                     ', Your admin account is successfully added to '  ${SERVER_NAME}
                                      ' , click here : https://easyfiles.onrender.com/ to access your account. ' 
                                    ' Password = ' ${password} ' UserName = '  ${userName} ' Company ID = ' 
                                      ${company} , ' Department ID = ${department}`
                                            };
                                            transporter.sendMail(mailConfigurations, function(error, info) {
                                                if (error) throw Error(error);
                                                if (error) {
                                                    console.log('no internet to send mail');
                                                }
                                                console.log('Email Sent Successfully');
                                                console.log(info);
                                            });
                                        } catch (error) {
                                            console.error('An error occurred:', error);
                                        }
                                    }
                                    // Initialize by sending an email
                                    sendEmailWithRefreshedToken();
                                } else {
                                    var error_register = "Account not created successfully,Try again";
                                    req.session.error_register = error_register;
                                    req.session.save();
                                    res.redirect("back");
                                    console.log(err);
                                }
                        if (err) throw err;
                            });
                        } else {


                    res.status(200).json({
                    message: 'Mail already exist...'

                    });
                        }
                    });
                    //
                    //releasing connection,when done using it
                } catch (error) {
                    console.log("can not insert....");
                }
            });
        });
        //end
        //check gmail
        //end
    });
};
//dashboard get admin
dashboard = (req, res) => {
    // preventing unathorizedaccess to the page
    var sql_select_files = '';
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/');
    } else {
        // var sql_select_files = `SELECT * FROM files`;
        // var sql_select_users = `SELECT * FROM users`;
        // var sql_select_downloads = `SELECT * FROM downloads`;
        // var sql_select_company = `SELECT * FROM company`;
        //select based on companies
        if (admin_Session.role == 1) {
            var sql_select_files = `SELECT * FROM files;
        SELECT * FROM users;SELECT * FROM downloads;
        SELECT * FROM company WHERE comp_id`;
        } else if (admin_Session.role == 2) {
            var sql_select_files = `SELECT * FROM files WHERE comp_id = ${admin_Session.comp_id};
        SELECT * FROM users;SELECT * FROM downloads WHERE comp_id = ${admin_Session.comp_id};
        SELECT * FROM company WHERE comp_id = ${admin_Session.comp_id}`;
        }
        //catching blockages
        try {
            //inserting
            //get connection
            // con.query(sql_select_files, (err, result_files, fields) => {
            // con.query(sql_select_users, (err, result_users, fields) => {
            //con.query(sql_select_downloads,(err, result_downloads, fields) => {
            con.query(sql_select_files, (err, results, fields) => {
                if (results) {
                    res.render("../views/admin/index.ejs", {
                        result_files: results[0],
                        result_users: results[1],
                        result_downloads: results[2],
                        result_company: results[3]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            //});
            // });
            //});
        } catch (error) {
            console.log("can not select....");
        }
    }
};
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/files");
    },
    //setting filename
    filename: function(req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({
    storage: storage
}).single("fileUpload");
fileUpload = (req, res, err) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        //checking sql injection
        var description = mysql.format(req.body.desc);
        var comp_id = mysql.format(req.body.company);
        var dept_id = mysql.format(req.body.department);
        var fileName = req.file.filename;
        var ext = path.extname(req.file.path);
        var fileSize = req.file.size;
        // Returns a random alpha:
        // var fileId = Math.random().toString(36).slice(2);
        var chars = '01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnompqrstuvwxyz';
        var fileId = '';
        for (var i = 0; i < 25; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            fileId += chars.substring(rnum, rnum + 1);
        }
        //console.log(fileId)
        // end
        var fileData = [,
            fileId,
            comp_id,
            dept_id,
            description,
            fileName,
            ext,
            fileSize,
            new Date()
        ];
        var sql_insert_file = `INSERT INTO files (id,fileId,comp_id,dept_id,description,fileName,fileType,fileSize,created_at) 
     VALUES (?,?,?,?,?,?,?,?,?)`;
        //catching blockages
        try {
            //inserting
            //get connection
            con.query(sql_insert_file, fileData, (err, result) => {
                if (result) {
                    req.session.message = 'file added.';
                    var sql_select_all_dept_users = `SELECT * FROM users WHERE dept_id = ? AND role = 0 `;
                    //get connection
                    con.query(sql_select_all_dept_users, dept_id, (err, result, fields) => {
                        if (result) {
                            //fetching user data
                            result.forEach(data => {
                                userName = data.userName;
                                recipientNumber = data.tel;
                                userId = data.userId;
                                role = data.role;
                                dept_id = data.dept_id;
                                comp_id = data.comp_id;
                                created_at = data.created_at;
                                //send message while looping
                                //const recipientNumber = '0547901448';
                                const message = 'Hello ' + userName + ', You have a file received from your organisation ' + 'with a description ' + description + ' ,click here : https://easyfiles.onrender.com/ to access the file';
                                // Construct the API URL
                                const apiUrl = `https://apps.mnotify.net/smsapi?key=${MNOTIFY_API_KEY}&to=${recipientNumber}&msg=${message}&sender_id=${SENDER_ID}`;
                                // Send the SMS
                                axios.get(apiUrl).then(response => {
                                    console.log('SMS sent successfully');
                                    console.log(response.data); // Optional: Log the API response
                                }).catch(error => {
                                    console.error('Failed to send SMS:', error);
                                });
                                //send mail notification
                                async function sendEmailWithRefreshedToken() {
                                    try {
                                        //send token after verifying password
                                        const mailConfigurations = {
                                            // It should be a string of sender/server email
                                            from: EMAIL_USERNAME,
                                            to: email,
                                            // Subject of Email
                                            subject: 'Files Upload Alert',
                                            // This would be the text of email body
                                            //  + user +
                                            html: `Hello ' ${userName} 
                                     ', Your company has a file uploaded on the '  ${SERVER_NAME}
                                      ' , click here : https://easyfiles.onrender.com/ to access your files`
                                        };
                                        transporter.sendMail(mailConfigurations, function(error, info) {
                                            if (error) throw Error(error);
                                            if (error) {
                                                console.log('no internet to send mail');
                                            }
                                            console.log('Email Sent Successfully');
                                        });
                                    } catch (error) {
                                        console.error('An error occurred:', error);
                                    }
                                }
                                // Initialize by sending an email
                                sendEmailWithRefreshedToken();
                                console.log(recipientNumber);
                            });
                        } else {
                            console.log("can not select.....");
                        }
                        //end foreach
                    });
                    res.redirect("back");
                }
                if (err) throw err;
            });
            //releasing connection,when done using it
        } catch (error) {
            console.log("can not insert....");
        }
        //end
    });
req.session.message='';
};
//files view
filesView = (req, res) => {
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        // var sql_select_file = `SELECT * FROM files ORDER BY created_at desc`;
        // //company
        // var sql_select_company = `SELECT * FROM company`;
        // //company
        // var sql_select_department = `SELECT * FROM department`;
        var sql_select_file = '';
        //select based on companies
        if (admin_Session.role == 1) {
            sql_select_file = `SELECT * FROM files ORDER BY created_at desc;SELECT * FROM company;SELECT * FROM department`;
        } else if (admin_Session.role == 2) {
            var sql_select_file = `SELECT * FROM files WHERE comp_id = ${admin_Session.comp_id} ORDER BY created_at desc;
        SELECT * FROM company;SELECT * FROM department WHERE comp_id = ${admin_Session.comp_id}`;
        }
        //catching blockages
        try {
            //inserting
            //get connection
            con.query(sql_select_file, (err, results, fields) => {
                if (results) {
                    res.render("../views/admin/files.ejs", {
                        result: results[0],
                        result_company: results[1],
                        result_department: results[2]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
//files view
filesLogs = (req, res) => {
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        // var sql_select_file = `SELECT * FROM files ORDER BY created_at desc`;
        // //company
        // var sql_select_company = `SELECT * FROM company`;
        // //company
        // var sql_select_department = `SELECT * FROM department`;
        var sql_select_file = '';
        //select based on companies
        if (admin_Session.role == 1) {
            sql_select_file = `SELECT * FROM files_logs ORDER BY created_at desc;SELECT * FROM company;SELECT * FROM department`;
        } else if (admin_Session.role == 2) {
            var sql_select_file = `SELECT * FROM files_logs WHERE comp_id = ${admin_Session.comp_id} ORDER BY created_at desc;
        SELECT * FROM company;SELECT * FROM department WHERE comp_id = ${admin_Session.comp_id}`;
        }
        //catching blockages
        try {
            //inserting
            //get connection
            con.query(sql_select_file, (err, results, fields) => {
                if (results) {
                    res.render("../views/admin/filesLogs.ejs", {
                        result: results[0],
                        result_company: results[1],
                        result_department: results[2]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
//end
// delete files
deleteFile = (req, res) => {
    try {
        var fileId = req.params.fileId;
        // console.log(fileId);  
        var description = '';
        var comp_id = '';
        var dept_id = '';
        var fileName = '';
        var ext = '';
        var fileSize = '';
        //    var sql_query_files = `INSERT INTO files_logs (id,fileId,comp_id,dept_id,description,fileName,fileType,fileSize,created_at) 
        // VALUES (?,?,?,?,?,?,?,?,?);DELETE FROM files WHERE fileId = ?`;
        var sql_query_file = `SELECT * FROM files WHERE fileId = ?`;
        //inserting
        var fileData = '';
        var id = Math.floor(Math.random() * 99999);
        var sql_query_files = `INSERT INTO files_logs (id, fileId, comp_id, dept_id, description, fileName, fileType, fileSize, created_at) 
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
DELETE FROM files WHERE fileId = ?;`;
        con.query(sql_query_file, fileId, (err, result_select, fields) => {
            if (err) throw err;
            console.log(result_select);
            if (result_select.length > 0) {
                result_select.forEach(data => {
                    description = data.description;
                    comp_id = data.comp_id;
                    dept_id = data.dept_id;
                    fileName = data.fileName;
                    ext = data.fileType;
                    fileSize = data.fileSize;
                    fileData = [id, fileId, comp_id, dept_id, description, fileName, ext, fileSize, new Date(), fileId]
                    //while deleted
                    con.query(sql_query_files, fileData, (err, result_fetch, fields) => {
                        if (err) throw err;
                        if (result_fetch) {
                            if (result_fetch[0]) {
                                console.log("file moved to recycle bin");
                            } else {
                                console.log("can not move.....");
                                console.log(err);
                            }
                            if (result_fetch[1]) {
                                console.log("file deleted");
                            } else {
                                console.log("can not delete.....");
                                console.log(err);
                            }
                        }
                        //endif
                        req.session.message = 'file deleted.';
                        res.redirect("back");
                    });
                    //end foreach
                });
            }
            //end select if
        });
    } catch (error) {
        console.log("can not delete....");
        console.log(error);
    }
    req.session.message='';
};
// edit files
//get
editFile = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var fileId = req.params.fileId;
        //console.log(fileId);
        // var sql_select_file = `SELECT * FROM files WHERE fileId = ?`;
        // //company
        // var sql_select_company = `SELECT * FROM company`;
        // //company
        // var sql_select_department = `SELECT * FROM department`;
        var sql_select_file = `SELECT * FROM files WHERE fileId = ?;SELECT * FROM company;SELECT * FROM department`;
        try {
            //inserting
            // con.query(sql_select_company, (err, result_company, fields) => {
            //   con.query(sql_select_department,(err, result_department, fields) => {
            //get connection
            con.query(sql_select_file, [fileId], (err, result, fields) => {
                if (result) {
                    res.render("../views/admin/filesEdit.ejs", {
                        result: result[0],
                        result_company: result[1],
                        result_department: result[2]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            //     });
            // });
        } catch (error) {
            console.log("can not select....");
        }
    }
};
//  end
// preview files admin
//get
filePreview = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var fileId = req.params.fileId;
        //console.log(fileId);
        var sql_preview_file = `SELECT * FROM files WHERE fileId = ?`;
        try {
            //inserting
            //get connection
            con.query(sql_preview_file, fileId, (err, result, fields) => {
                if (result) {
                    res.render("../views/admin/filePreview.ejs", {
                        result: result
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
//files update to storage
//post
fileUpdate = (req, res, err) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading file.");
        }
        //checking sql injection
        var fileId = mysql.format(req.body.fileId);
        var description = mysql.format(req.body.desc);
        var comp_id = mysql.format(req.body.company);
        var dept_id = mysql.format(req.body.department);
        //old file
        var oldfile = mysql.format(req.body.oldfile);
        // vars
        var sql_update_file = "";
        var fileData;
        // deleting old file if updated by the
        if (req.file) {
            const filepath = "./public/files/" + oldfile;
            //deleting old file on file update
            fs.exists(filepath, exist => {
                if (exist) {
                    fs.unlinkSync(filepath);
                    //console.log(filepath);
                }
            });
            // end
            var ext = path.extname(req.file.path);
            var fileSize = req.file.size;
            fileName = req.file.filename;
            // console.log(fileName);
            sql_update_file = `UPDATE files SET 
      comp_id = ?,dept_id = ?,description = ?,fileName = ?,fileType = ? ,fileSize = ? WHERE fileId = ?`;
            fileData = [comp_id, dept_id, description, fileName, ext, fileSize, fileId];
        } else {
            sql_update_file = `UPDATE files SET comp_id = ?,dept_id = ?,description = ? WHERE fileId = ?`;
            fileData = [comp_id, dept_id, description, fileId];
        }
        //catching blockages
        try {
            //inserting
            //get connection
            con.query(sql_update_file, fileData, (err, result) => {
                if (result) {
                    req.session.message = 'file updated.';
                    res.redirect("/files");
                }
                if (err) throw err;
            });
            //releasing connection,when done using it
        } catch (error) {
            console.log("can not update....");
        }
        //end
    });
    req.session.message='';
};
// end
//emptyfiles
emptyfiles = (req, res) => {
    var sql_empty_logs = `TRUNCATE TABLE files`;
    try {
        //inserting
        //get connection
        con.query(sql_empty_logs, (err, result, fields) => {
            if (result) {
                req.session.message = 'files emptied.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not TRUNCATE....");
    }
    req.session.message='';
};
// end
//emptyfiles
emptyfileslogs = (req, res) => {
    var sql_empty_logs = `TRUNCATE TABLE files_logs`;
    try {
        //inserting
        //get connection
        con.query(sql_empty_logs, (err, result, fields) => {
            if (result) {
                req.session.message = 'Recycle bin emptied.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not TRUNCATE....");
    }
    req.session.message='';
};
// end
// end
//view  downloads
viewDownloads = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        // var sql_select_dowwnloads = `SELECT * FROM downloads`;
        // var sql_select_files_audio = `SELECT * FROM downloads WHERE 
        //                               fileType = '.mp3' OR fileType = '.m4a' OR fileType = '.wma'
        //                                OR fileType = '.acc' OR fileType = '.wav' OR fileType = '.flac'`;
        // var sql_select_files_video = `SELECT * FROM downloads WHERE 
        //                               fileType = '.mp4' OR fileType = '.avi' OR fileType = '.mpeg-2'
        //                                OR fileType = '.webm' OR fileType = '.mkv' OR fileType = '.mov'`;
        // var sql_select_files_doc = `SELECT * FROM downloads WHERE 
        //                               fileType = '.pdf' OR fileType = '.dot' OR fileType = '.doc' OR fileType = '.docm'
        //                               OR fileType = '.docx' OR fileType = '.ppt' OR fileType= '.txt' OR fileType = '.csv'`;
        // var sql_select_files_image = `SELECT * FROM downloads WHERE 
        //                               fileType = '.gif' OR fileType = '.png' OR fileType = '.jpg'
        //                                OR fileType = '.jpeg'`;
        var sql_select_dowwnloads = '';
        //select based on companies
        if (admin_Session.role == 1) {
            var sql_select_dowwnloads = `SELECT * FROM downloads;SELECT * FROM downloads WHERE 
                                fileType = '.mp3' OR fileType = '.m4a' OR fileType = '.wma'
                                 OR fileType = '.acc' OR fileType = '.wav' OR fileType = '.flac';SELECT * FROM downloads WHERE 
                                fileType = '.mp4' OR fileType = '.avi' OR fileType = '.mpeg-2'
                                 OR fileType = '.webm' OR fileType = '.mkv' OR fileType = '.mov';SELECT * FROM downloads WHERE 
                                fileType = '.pdf' OR fileType = '.dot' OR fileType = '.doc' OR fileType = '.docm'
                                OR fileType = '.docx' OR fileType = '.ppt' OR fileType= '.txt' OR fileType = '.csv';SELECT * FROM downloads WHERE 
                                fileType = '.gif' OR fileType = '.png' OR fileType = '.jpg' OR fileType = '.jfif'
                                 OR fileType = '.jpeg'`;
        } else if (admin_Session.role == 2) {
            var sql_select_dowwnloads = `SELECT * FROM downloads WHERE comp_id = ${admin_Session.comp_id};
                               SELECT * FROM downloads WHERE fileType = '.mp3' OR fileType = '.m4a' OR fileType = '.wma'
                                OR fileType = '.acc' OR fileType = '.wav' OR fileType = '.flac' AND comp_id = ${admin_Session.comp_id};
                                SELECT * FROM downloads WHERE fileType = '.mp4' OR fileType = '.avi' OR fileType = '.mpeg-2'
                                OR fileType = '.webm' OR fileType = '.mkv' OR fileType = '.mov' AND comp_id = ${admin_Session.comp_id};
                                SELECT * FROM downloads WHERE fileType = '.pdf' OR fileType = '.dot' OR fileType = '.doc' OR fileType = '.docm'
                                OR fileType = '.docx' OR fileType = '.ppt' OR fileType= '.txt' OR fileType = '.csv' AND comp_id = ${admin_Session.comp_id};
                                SELECT * FROM downloads WHERE  fileType = '.gif' OR fileType = '.jfif' OR fileType = '.png' OR fileType = '.jpg' OR fileType = '.jpeg' AND comp_id = ${admin_Session.comp_id}`;
        }

        //catching blockages
        try {
            //inserting
            // con.query(
            //   sql_select_files_audio,
            //   (err, result_files_audio, fields) => {
            //     con.query(
            //       sql_select_files_video,
            //       (err, result_files_video, fields) => {
            //         con.query(
            //           sql_select_files_doc,
            //           (err, result_files_doc, fields) => {
            // con.query(
            //   sql_select_files_image,
            //   (err, result_files_image, fields) => {
            con.query(sql_select_dowwnloads, (err, result_downloads, fields) => {
                if (result_downloads) {
                    res.render("../views/admin/downloads.ejs", {
                        result_downloads: result_downloads[0],
                        result_files_audio: result_downloads[1],
                        result_files_video: result_downloads[2],
                        result_files_doc: result_downloads[3],
                        result_files_image: result_downloads[4]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            // });
            //         });
            //     });
            // });
        } catch (error) {
            console.log("can not select....");
        }
    }

    req.session.message='';
};
// delete downloads
deleteDownload = (req, res) => {
    var fileId = req.params.fileId;
    //console.log(fileId);
    var sql_delete_downloads = `DELETE FROM downloads WHERE fileId = ?`;
    try {
        //inserting
        //get connection
        con.query(sql_delete_downloads, fileId, (err, result, fields) => {
            if (result) {
                req.session.message = 'downloads deleted.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not delete....");
    }
    req.session.message='';
};
//end
//emptyfiles
emptydownload = (req, res) => {
    var sql_empty_logs = `TRUNCATE TABLE downloads`;
    try {
        //inserting
        //get connection
        con.query(sql_empty_logs, (err, result, fields) => {
            if (result) {
                req.session.message = 'downloads emptied.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not TRUNCATE....");
    }

    req.session.message='';
};
// end
//emptycompanies
emptycompanies = (req, res) => {
    var sql_empty_logs = `TRUNCATE TABLE company`;
    try {
        //inserting
        //get connection
        con.query(sql_empty_logs, (err, result, fields) => {
            if (result) {
                req.session.message = 'companies deleted.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not TRUNCATE....");
    }
    req.session.message='';
};
// end
// end
//view  companines
viewCompanines = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var sql_select_company = '';
        //select based on companies
        if (admin_Session.role == 1) {
            var sql_select_company = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM company`;
        } else if (admin_Session.role == 2) {
            var sql_select_company = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM company WHERE comp_id = ${admin_Session.comp_id}`;
        }
        //catching blockages
        try {
            //inserting
            con.query(sql_select_company, (err, result_company, fields) => {
                if (result_company) {
                    res.render("../views/admin/companines.ejs", {
                        result_company: result_company
                    });



                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }

     req.session.message='';


};
//end
//add  Company
//post
addCompany = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading data.");
        }
        //checking sql injection
        var compName = mysql.format(req.body.compName);
        var comptLocation = mysql.format(req.body.comptLocation);
        var comptel = mysql.format(req.body.comptel);
        var compMail = mysql.format(req.body.compMail);
        //unique code
        // var fileId = Math.random().toString(36).slice(2);
        var chars = '01234567890ABCDEFGHJKLMNOPQRSTUVWXYZ';
        var ComP_Ucod = '';
        for (var i = 0; i < 10; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            ComP_Ucod += chars.substring(rnum, rnum + 1);
        }
        //console.log(compName);
        // Returns a random integer from 0 to 99999:
        var comp_id = Math.floor(Math.random() * 99999);
        var fileData = [,
            comp_id,
            compName,
            ComP_Ucod,
            comptLocation,
            comptel,
            compMail,
            new Date()
        ];
        var sql_insert_company = `INSERT INTO company (id,comp_id, comp_name, ComP_Ucod,comp_location, comp_tel, comp_mail ,created_at) 
   VALUES (?,?,?,?,?,?,?,?)`;
        //catching blockages
        try {
            //inserting
            con.query(sql_insert_company, fileData, (err, result, fields) => {
                if (result) {
                    const message = 'Hello ' + compName + ', Your organisation is successfully added to ' + SERVER_NAME 
                    + 'with a unique Code ' + ComP_Ucod + ' for your members registeration , keep it private.. ,click here : https://easyfiles.onrender.com/ to access your organisation.';
                    // Construct the API URL
                    const apiUrl = `https://apps.mnotify.net/smsapi?key=${MNOTIFY_API_KEY}&to=${comptel}&msg=${message}&sender_id=${SENDER_ID}`;
                    // Send the SMS
                    axios.get(apiUrl).then(response => {
                        console.log('SMS sent successfully');
                        
                        console.log(response.data); // Optional: Log the API response
                    }).catch(error => {
                        console.error('Failed to send unique code SMS:', error);
                    });
                    // Function to send an email
                    async function sendEmailWithRefreshedToken() {
                        try {
                            //send token after verifying password
                            const mailConfigurations = {
                                // It should be a string of sender/server email
                                from: EMAIL_USERNAME,
                                to: compMail,
                                // Subject of Email
                                subject: 'Organisation Account Creation',
                                // This would be the text of email body
                                //  + user +
                                html: `Hello ' ${userName} 
                                     ', Your organisation account is successfully created on'  ${SERVER_NAME}
                                      ' , click here : https://easyfiles.onrender.com/ to access your account. Company unique ID = ' 
                                      ${ComP_Ucod} , 'to be used by organisational user for verification, keep it private..`
                            };
                            transporter.sendMail(mailConfigurations, function(error, info) {
                                if (error) throw Error(error);
                                if (error) {
                                    console.log('no internet to send mail');
                                }
                                console.log('Email Sent Successfully');
                                console.log(info);
                            });
                        } catch (error) {
                            console.error('An error occurred:', error);
                        }
                    }
                    // Initialize by sending an email
                    sendEmailWithRefreshedToken();
                    req.session.message = 'company added.';
                    res.redirect("back");
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not insert....");
        }
    });
req.session.message='';
};
// end
//update company
updateCompany = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading data.");
        }
        //checking sql injection
        var compName = mysql.format(req.body.username);
        var comptLocation = mysql.format(req.body.comptLocation);
        var comptel = mysql.format(req.body.telephone);
        var compMail = mysql.format(req.body.compMail);
        var comp_id = mysql.format(req.body.company);
        // Returns a random integer from 0 to 99999:
        var fileData = [
            compName,
            comptLocation,
            comptel,
            compMail,
            comp_id
        ];
        //catching blockages
        sql_update_company = `UPDATE company SET comp_name = ?,comp_location = ?,comp_tel = ?,comp_mail = ? WHERE comp_id = ?`;
        try {
            //inserting
            con.query(sql_update_company, fileData, (err, result, fields) => {
                if (result) {
                    req.session.message = compName + ' updated.';
                    res.redirect('/companies');
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not insert....");
        }
    });
    req.session.message='';
};
// end
//get
editComp = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var comp_id = req.params.comp_id;
        //console.log(fileId);
        // var sql_select_file = `SELECT * FROM files WHERE fileId = ?`;
        // //company
        // var sql_select_company = `SELECT * FROM company`;
        // //company
        // var sql_select_department = `SELECT * FROM department`;
        var sql_select_company = `SELECT * FROM company WHERE comp_id = ?`;
        try {
            //inserting
            // con.query(sql_select_company, (err, result_company, fields) => {
            //   con.query(sql_select_department,(err, result_department, fields) => {
            //get connection
            con.query(sql_select_company, [comp_id], (err, result_company, fields) => {
                if (result_company) {
                    res.render("../views/admin/compEdit.ejs", {
                        result_company: result_company,
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            //     });
            // });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
//  end
// delete department get
deleteCompany = (req, res) => {
    var comp_id = req.params.comp_id;
    //console.log(fileId);
    var sql_delete_comp = `DELETE FROM company WHERE comp_id = ?`;
    try {
        //inserting
        //get connection
        con.query(sql_delete_comp, comp_id, (err, result, fields) => {
            if (result) {
                req.session.message = 'company deleted.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not delete....");
    }

    req.session.message='';
};
//view  companines get
viewDepartment = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var sql_select_department = '';
        //select based on companies
        if (admin_Session.role == 1) {
            var sql_select_department = `SELECT * , Day(created_at) AS Day,Year(created_at) AS 
       Year,Month(created_at) AS Month FROM department ORDER BY created_at desc;SELECT * FROM company ORDER BY created_at desc`;
        } else if (admin_Session.role == 2) {
            sql_select_department = `SELECT * , Day(created_at) AS Day,Year(created_at) AS 
   Year,Month(created_at) AS Month FROM department WHERE comp_id = ${admin_Session.comp_id} ORDER BY created_at desc;
   SELECT * FROM company WHERE comp_id = ${admin_Session.comp_id} ORDER BY created_at desc`;
        }
        //catching blockages
        try {
            //inserting
            // con.query(
            //   sql_select_department,
            //   (err, result_department, fields) => {
            con.query(sql_select_department, (err, result, fields) => {
                if (result) {
                    res.render("../views/admin/department.ejs", {
                        result_department: result[0],
                        result_company: result[1]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            //   }
            // );
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
// end
//get
editDept = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var dept_id = req.params.dept_id;
        //console.log(fileId);
        // var sql_select_file = `SELECT * FROM files WHERE fileId = ?`;
        // //company
        // var sql_select_company = `SELECT * FROM company`;
        // //company
        // var sql_select_department = `SELECT * FROM department`;
        var sql_select_company = `SELECT * FROM department WHERE dept_id = ?`;
        try {
            //inserting
            // con.query(sql_select_company, (err, result_company, fields) => {
            //   con.query(sql_select_department,(err, result_department, fields) => {
            //get connection
            con.query(sql_select_company, [dept_id], (err, result, fields) => {
                if (result) {
                    res.render("../views/admin/deptEdit.ejs", {
                        result_department: result
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            //     });
            // });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
//  end
//add  department
//post
addDepartment = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading form data.");
        }
        //checking sql injection
        var deptName = mysql.format(req.body.deptName);
        var deptLocation = mysql.format(req.body.deptLocation);
        var deptMail = mysql.format(req.body.deptMail);
        var comp_id = mysql.format(req.body.company);
        var tel = mysql.format(req.body.tel);
        // Returns a random integer from 0 to 99999:
        var dept_id = Math.floor(Math.random() * 99999);
        var fileData = [,
            dept_id,
            comp_id,
            deptName,
            deptLocation,
            deptMail,
            tel,
            new Date()
        ];
        var sql_insert_department = `INSERT INTO department (id,dept_id, comp_id, dept_name, dept_location, dept_mail , tel,created_at) 
   VALUES (?,?,?,?,?,?,?,?)`;
        //catching blockages
        try {
            //inserting
            con.query(sql_insert_department, fileData, (err, result_department, fields) => {
                if (result_department) {
                    req.session.message = 'department added.';
                    res.redirect("back");
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not insert....");
        }
    });
    req.session.message='';
};
// end
//update department 
//post
updateDepartment = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading form data.");
        }
        //checking sql injection
        var deptName = mysql.format(req.body.deptName);
        var deptLocation = mysql.format(req.body.deptLocation);
        var deptMail = mysql.format(req.body.deptMail);
        var comp_id = mysql.format(req.body.company);
        var tel = mysql.format(req.body.tel);
        // Returns a random integer from 0 to 99999:
        var dept_id = mysql.format(req.body.dept_id);
        var fileData = [
            deptName,
            deptLocation,
            deptMail,
            tel,
            dept_id
        ];
        sql_update_dept = `UPDATE department SET dept_name = ?,dept_location = ?,dept_mail = ?,tel = ? WHERE dept_id = ?`;
        //catching blockages
        try {
            //inserting
            con.query(sql_update_dept, fileData, (err, result_department, fields) => {
                if (result_department) {
                    req.session.message = deptName + ' updated.';
                    res.redirect('/department');
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not insert....");
        }
    });

    req.session.message='';
};
// end
//fetchCompanyId
fetchCompanyId = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading form data.");
        }
        // Get input from the request (assuming it's in the query parameters)
        const ucode = req.query.input;
        const userSelectionCompId = req.query.userSelectionCompId;
        sql_select_company = `SELECT * FROM company WHERE ComP_Ucod = ? AND comp_id = ?`;
        const data = [ucode, userSelectionCompId];
        var ComP_Ucod = '';
        //catching blockages
        try {
            //inserting
            con.query(sql_select_company, data, (err, result_select_company, fields) => {
                if (result_select_company && result_select_company.length > 0) {
                    result_select_company.forEach(data => {
                        ComP_Ucod = data.ComP_Ucod;
                    });
                    res.status(200).json({
                        ComP_Ucod: ComP_Ucod
                    });
                } else {
                    res.status(200).json({
                        ComP_Ucod: "404"
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select company....");
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });
};
// end
// delete department get
deleteDepartment = (req, res) => {
    var dept_id = req.params.dept_id;
    //console.log(fileId);
    var sql_delete_dept = `DELETE FROM department WHERE dept_id = ?`;
    try {
        //inserting
        //get connection
        con.query(sql_delete_dept, dept_id, (err, result, fields) => {
            if (result) {
                req.session.message = 'department deleted.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not delete....");
    }
    req.session.message='';
};
//end 
//emptydepartment
emptydepartment = (req, res) => {
    var sql_empty_logs = `TRUNCATE TABLE department`;
    try {
        //inserting
        //get connection
        con.query(sql_empty_logs, (err, result, fields) => {
            if (result) {
                req.session.message = 'departments emptied.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not TRUNCATE....");
    }
    req.session.message='';
};
// end
//view  users
//get
viewUsers = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var sql_select_users = '';
        //select based on companies
        if (admin_Session.role == 1) {
            var sql_select_users = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM users ORDER BY created_at desc`;
        } else if (admin_Session.role == 2) {
            var sql_select_users = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM users WHERE comp_id = ${admin_Session.comp_id} ORDER BY created_at desc`;
        }
        //catching blockages
        try {
            //inserting
            con.query(sql_select_users, (err, result_users, fields) => {
                if (result_users) {
                    res.render("../views/admin/users.ejs", {
                        result_users: result_users
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
//zip logs
filesLogsDwonloadsZip = (req, res) => {
    const selectedFiles = req.query.files;
    try {
        if (Array.isArray(selectedFiles) && selectedFiles.length > 0) {
            // Create a writable stream for the ZIP archive
            const archive = archiver('zip', {
                zlib: {
                    level: 9
                } // Compression level (optional, default is 9)
            });
            // Set the response headers for the ZIP file download
            res.attachment('EasyFiles-files.zip');
            // Pipe the ZIP archive to the response stream
            archive.pipe(res);
            // Add selected files to the ZIP archive
            selectedFiles.forEach((file) => {
                const filePath = path.join(__dirname, 'public', 'files', file);
                if (fs.existsSync(filePath)) {
                    archive.file(filePath, {
                        name: file
                    });
                }
            });
            // Finalize the ZIP archive
            archive.finalize();
        } else {
            if (selectedFiles.length) {
                // Single file download
                ///const folderPath = __dirname + "/public/files";
                const filePath = path.join(__dirname, 'public', 'files', selectedFiles);
                if (fs.existsSync(filePath)) {
                    res.download(filePath);
                } else {
                    res.status(404).send('File not found.');
                }
            }
        }
    } catch (error) {
        console.log("no files selected");
        res.redirect("back");
    }
}
// delete user
deleteUsers = (req, res) => {
    var userId = req.params.userId;
    //console.log(fileId);
    var sql_delete_user = `DELETE FROM users WHERE userId = ?`;
    try {
        //inserting
        //get connection
        con.query(sql_delete_user, userId, (err, result, fields) => {
            if (result) {
                req.session.message = 'user deleted.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not delete....");
    }
    req.session.message='';
};
// VIEW admin user
//emptyusers
// empty logs
emptyusers = (req, res) => {
    var sql_empty_logs = `TRUNCATE TABLE users`;
    try {
        //inserting
        //get connection
        con.query(sql_empty_logs, (err, result, fields) => {
            if (result) {
                req.session.message = 'users emptied.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not TRUNCATE....");
    }

    req.session.message='';
};
//end
//view  logs
//get
viewLogs = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var sql_select_logs = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at)
   AS Month FROM logs ORDER BY created_at ASC`;
        //catching blockages
        try {
            //inserting
            con.query(sql_select_logs, (err, result_logs, fields) => {
                if (result_logs) {
                    res.render("../views/admin/logs.ejs", {
                        result_logs: result_logs
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
// end
// delete log
deletelog = (req, res) => {
    var Id = req.params.id;
    var sql_delete_log = `DELETE FROM logs WHERE id = ?`;
    try {
        //inserting
        //get connection
        con.query(sql_delete_log, Id, (err, result, fields) => {
            if (result) {
                req.session.message = 'log deleted.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not delete....");
    }
    req.session.message='';
};
// end
// empty logs
emptylogs = (req, res) => {
    var sql_empty_logs = `TRUNCATE TABLE logs`;
    try {
        //inserting
        //get connection
        con.query(sql_empty_logs, (err, result, fields) => {
            if (result) {
                req.session.message = 'logs emptied.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not TRUNCATE....");
    }
    req.session.message='';
};
//viewErrLogs
//view  err logs
//get
viewErrLogs = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var sql_select_err_logs = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM error_logs ORDER BY created_at ASC`;
        //catching blockages
        try {
            //inserting
            con.query(sql_select_err_logs, (err, result_err_logs, fields) => {
                if (result_err_logs) {
                    res.render("../views/admin/err_logs.ejs", {
                        result_err_logs: result_err_logs
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
// end
// delete err log
delete_Errlog = (req, res) => {
    var Id = req.params.id;
    var sql_delete_log = `DELETE FROM error_logs WHERE id = ?`;
    try {
        //inserting
        //get connection
        con.query(sql_delete_log, Id, (err, result, fields) => {
            if (result) {
                req.session.message = 'error logs deleted.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not delete....");
    }
    req.session.message='';
};
// end
// empty err logs
emptyerror_logs = (req, res) => {
    var sql_empty_logs = `TRUNCATE TABLE error_logs`;
    try {
        //inserting
        //get connection
        con.query(sql_empty_logs, (err, result, fields) => {
            if (result) {
                req.session.message = 'error logs emptied.';
                res.redirect("back");
            }
            if (err) throw err;
            //releasing connection,when done using it
        });
    } catch (error) {
        console.log("can not TRUNCATE....");
    }
};
// end
adminProfile = (req, res) => {
    // preventing unathorizedaccess to the page
    if (admin_Session.userId == '' && admin_Session.role == '') {
        res.redirect('/login');
    } else {
        var userId = admin_Session.userId;
        var sql_view_admin_user = `SELECT * FROM users WHERE userId = ?`;
        try {
            //inserting
            //get connection
            con.query(sql_view_admin_user, userId, (err, result_admin_profile, fields) => {
                if (result_admin_profile) {
                    res.render("../views/admin/profile.ejs", {
                        result_admin_profile: result_admin_profile
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
    req.session.message='';
};
//customer
//view  files
Customerhome = (req, res) => {
    var dept_id = user_Session.dept_id;
    var comp_id = user_Session.comp_id;
    //preventing unauthorised access 
    if (user_Session.userId == '' && user_Session.role == '') {
        res.redirect('/login');
    } else {
        var sql_select_files_all = `
        SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM files WHERE dept_id = ${dept_id} ORDER BY created_at DESC;
        
        SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM files WHERE (fileType = '.mp3' OR fileType = '.m4a' OR fileType = '.wma'
                                 OR fileType = '.acc' OR fileType = '.wav' OR fileType = '.flac') AND dept_id = '${dept_id}';
        SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM files WHERE (fileType = '.mp4' OR fileType = '.avi' OR fileType = '.mpeg-2'
                                 OR fileType = '.webm' OR fileType = '.mkv' OR fileType = '.mov') AND dept_id = '${dept_id}';
        SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM files WHERE  
                                fileType = '.pdf' OR fileType = '.dot' OR fileType = '.doc' OR fileType = '.docm' OR fileType = '.docx' OR fileType = '.ppt' OR fileType= '.txt' OR fileType = '.csv AND dept_id = ${dept_id}';
         SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM files WHERE
          (fileType = '.gif' OR fileType = '.jfif' OR fileType = '.png' OR fileType = '.jpg' OR fileType = '.jpeg') AND dept_id = ${dept_id}`;
        //catching blockages
        try {
            //inserting
            // con.query(
            //   sql_select_files_all,
            //   (err, result_files_all, fields) => {
            //     // audio
            //     con.query(
            //       sql_select_files_audio,
            //       (err, result_files_audio, fields) => {
            //         con.query(
            //           sql_select_files_video,
            //           (err, result_files_video, fields) => {
            //             con.query(
            //               sql_select_files_doc,
            //               (err, result_files_doc, fields) => {
            con.query(sql_select_files_all, (err, result_files, fields) => {
                if (result_files) {
                    // result_files_all.forEach(file =>{
                    // console.log(file.Year);
                    //   });
                    res.render("../views/customer/index.ejs", {
                        result_files_all: result_files[0],
                        result_files_audio: result_files[1],
                        result_files_video: result_files[2],
                        result_files_doc: result_files[3],
                        result_files_image: result_files[4]
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
            // } );
            // } );
            // } );
            // });
        } catch (error) {
            console.log("can not select....");
        }
    }
};
// VIEW  user profile
userProfile = (req, res) => {
    //preventing unauthorised access  
    if (user_Session.userId == '' && user_Session.role == '') {
        res.redirect('/login');
    } else {
        var userId = user_Session.userId;
        var sql_view_user = `SELECT * FROM users WHERE userId = ?`;
        try {
            //inserting
            //get connection
            con.query(sql_view_user, userId, (err, result_user_profile, fields) => {
                if (result_user_profile) {
                    res.render("../views/customer/profile.ejs", {
                        result_user_profile: result_user_profile
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
};
// download file
downloadFile = (req, res, next) => {
    var fileType, fileId;
    var id = req.params.id;
    var fileName = req.params.fileName;
    // The folder path for the files
    const folderPath = __dirname + "/public/files";
    // try {
    var sql_select_file = `SELECT * FROM files WHERE id = ?`;
    var sql_download = `INSERT INTO downloads (id,userId,fileId,fileType,comp_id,dept_id,email,created_at) VALUES (?,?,?,?,?,?,?,?)`;
    con.query(sql_select_file, id, (err, result_select_files) => {
        if (result_select_files) {
            result_select_files.forEach(data => {
                fileType = data.fileType;
                fileId = data.fileId;
            });
            var downloadData = [,
                user_Session.userId,
                fileId, fileType,
                user_Session.dept_id,
                user_Session.comp_id,
                user_Session.gmail,
                new Date()
            ];
        }
        con.query(sql_download, downloadData, (err, result) => {
            if (err) throw err;
            if (result) {
                //inserted
                // console.log("inserted");
                //console.log(downloadData)
            }
        });
    });
    // end
    // zip method which take file path
    // and name as objects
    // res.zip([
    //  { path: folderPath+'/multiple_one_gfg.txt',
    //    name: 'one_gfg.txt'},
    //  { path: folderPath+'/multiple_two_gfg.txt',
    //    name: 'two_gfg.txt'},
    //  { path: folderPath+'/multiple_three_gfg.txt',
    //    name: 'three_gfg.txt'}
    // ])
    // Download function
    res.download(folderPath + "/" + fileName, function(err) {
        if (err) {
            console.log(err);
        }
        req.session.message = 'file added to downloads.';
    });
    // } catch (error) {
    //   console.log("can not download....");
    // }

    req.session.message='';
};
//files recovery
// download file
FileRecovery = (req, res, next) => {
    var fileType, fileId;
    var id = req.params.id;
    var fileName = req.params.fileName;
    var fileId = req.params.fileId;
    // The folder path for the files
    const folderPath = __dirname + "/public/files";
    // try {
    var sql_select_file = `SELECT * FROM files_logs WHERE fileId = ?`;
    var sql_download = `INSERT INTO downloads (id,userId,fileId,fileType,comp_id,dept_id,email,created_at) VALUES (?,?,?,?,?,?,?,?)`;
    con.query(sql_select_file, fileId, (err, result_select_files) => {
        if (result_select_files) {
            result_select_files.forEach(data => {
                //console.log(data);
                fileType = data.fileType;
                fileId = data.fileId;
            });
            var downloadData = [,
                admin_Session.userId,
                fileId, fileType,
                admin_Session.dept_id,
                admin_Session.comp_id,
                admin_Session.gmail,
                new Date()
            ];
        }
        con.query(sql_download, downloadData, (err, result) => {
            if (err) throw err;
            if (result) {
                //inserted
                // console.log("inserted");
                //console.log(downloadData)
            }
        });
    });
    // end
    // zip method which take file path
    // and name as objects
    // res.zip([
    //  { path: folderPath+'/multiple_one_gfg.txt',
    //    name: 'one_gfg.txt'},
    //  { path: folderPath+'/multiple_two_gfg.txt',
    //    name: 'two_gfg.txt'},
    //  { path: folderPath+'/multiple_three_gfg.txt',
    //    name: 'three_gfg.txt'}
    // ])
    // Download function
    res.download(folderPath + "/" + fileName, function(err) {
        if (err) {
            console.log(err);
        }
        req.session.message = 'file added to downloads.';
    });
    // } catch (error) {
    //   console.log("can not download....");
    // }

    req.session.message='';
};
///jwt
const jwt = require('jsonwebtoken');
//forgot pass
forgotPassword = (req, res) => {
    res.render("../views/forgotPassword.ejs");
    req.session.destroy();
};
//forgot account Verification post
accountVerification = (req, res, err) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error geting  data.");
        }
        var dbGmail, userName, userId;
        //checking sql injection
        var gmail = mysql.format(req.body.email);
        //console.log(gmail);
        var sql_verify_user = `SELECT * FROM users WHERE gmail = ?`;
        //catching blockages
        try {
            //inserting
            //get connection
            con.query(sql_verify_user, gmail, (err, result) => {
                if (result) {
                    //fetching user data
                    result.forEach(data => {
                        userName = data.userName;
                        dbGmail = data.gmail;
                        userId = data.userId;
                    });
                    //verifying user info
                    if (dbGmail === gmail) {
                        // if(email === dbGmail && username === dbuserName){
                        // Function to send an email
                        async function sendEmailWithRefreshedToken() {
                            try {
                                //send token after verifying password
                                const mailConfigurations = {
                                    // It should be a string of sender/server email
                                    from: EMAIL_USERNAME,
                                    to: dbGmail,
                                    // Subject of Email
                                    subject: 'Account Recovery Verification',
                                    // This would be the text of email body
                                    //  + user +
                                    html: `<h1>Hi! There </h1>, <p>
                            You have recently requested for account password recovery
       Please follow the given link to verify your email</p>
      <a href = "http://localhost:3030/verify/${token}/${userId}">click Here to Reset your password</a>`
                                };
                                transporter.sendMail(mailConfigurations, function(error, info) {
                                    if (error) throw Error(error);
                                    if (error) {
                                        console.log('no internet to send mail');
                                    }
                                    console.log('Email Sent Successfully');
                                    console.log(info);
                                    var success_messsage = "Token has been sent to the mail provided, click to verify your account";
                                    req.session.success_forgot_pass = success_messsage;
                                    req.session.save();
                                    res.redirect("/forgot/password");
                                });
                            } catch (error) {
                                console.error('An error occurred:', error);
                            }
                        }
                        // Initialize by sending an email
                        sendEmailWithRefreshedToken();
                    } else {
                        var error_messsage_pass = "No Account is associated with this gmail, Try again";
                        req.session.error_forgot_pass = error_messsage_pass;
                        req.session.save();
                        res.redirect("/forgot/password");
                        //redirect back
                    }
                } else {
                    var error_messsage_pass = "No Account is associated with this gmail ";
                    req.session.error_forgot_pass = error_messsage_pass;
                    req.session.save();
                    res.redirect("/forgot/password");
                }
                if (err) throw err;
            });
            //releasing connection,when done using it
        } catch (error) {
            console.log("can not send mail....");
        }
        //end
    });
};
//verify JJwt
verifyJwt = (req, res) => {
    const token = req.params.token;
    const userId = req.params.userId;
    userId
    // Verifying the JWT token 
    jwt.verify(token, 'ourSecretKey', function(err, decoded) {
        if (err) {
            console.log(err);
            //error
            //res.send("Email not verifified successfully");
            //redirect back
            var error_messsage_pass = "Account verification faild,try again";
            req.session.error_forgot_pass = error_messsage_pass;
            req.session.save();
            res.redirect("/forgot/password");
        } else {
            //success
            var verify_token_message = "Account verification succeeded,change your password here";
            req.session.verify_token = verify_token_message;
            req.session.save();
            res.render("../views/updatePassword.ejs", {
                userId: userId
            });
        }
    });
};
//update password post
updatePassword = (req, res) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error uploading form data.");
        }
        //checking sql injection 
        var password = mysql.format(req.body.password);
        //encrption of the string password
        bcrypt.genSalt(10, function(err, salt) {
            if (err) throw err;
            //bcrppt for the password
            bcrypt.hash(password, salt, async function(err, hashpass) {
                //log(hash);
                //var repassword = mysql.format(req.body.repassword);
                var userId = mysql.format(req.body.userId);
                var fileData = [hashpass, userId];
                sql_update_user_pass = `UPDATE users SET PASSWORD = ? WHERE userId = ?`;
                //catching blockages
                try {
                    //inserting
                    con.query(sql_update_user_pass, fileData, (err, result_update_pass, fields) => {
                        if (result_update_pass) {
                            //redirect back
                            var update_success_message = "Account recovered successfully,login here";
                            req.session.success_update_pass = update_success_message;
                            req.session.save();
                            res.redirect('/login');
                        } else {
                            var update_error_message = "Could not update account successfully,Try again";
                            req.session.error_update_pass = update_error_message;
                            req.session.save();
                            //with response message ,try again
                            res.redirect('/forgot/password');
                        }
                        if (err) throw err;
                        //releasing connection,when done using it
                    });
                } catch (error) {
                    console.log("can not update....");
                }
            });
        });
    });
};
//share files get
shareFile = (req, res) => {
    //preventing unauthorised access  
    if (user_Session.userId == '' && user_Session.role == '') {
        res.redirect('/login');
        req.session.destroy();
    } else {
        var fileId = req.params.fileId;
        var sql_select_file = `SELECT * FROM files WHERE fileId = ?`;
        //catching blockages
        try {
            //inserting
            //get connection
            con.query(sql_select_file, fileId, (err, result_files, fields) => {
                if (result_files) {
                    res.render("../views/shareFile.ejs", {
                        result_files: result_files
                    });
                }
                if (err) throw err;
                //releasing connection,when done using it
            });
        } catch (error) {
            console.log("can not select....");
        }
    }
};
//send file post
sendFile = (req, res, err) => {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Error geting  data.");
        }
        var fileName, description;
        //checking sql injection
        var emails = mysql.format(req.body.email);
        var subject = mysql.format(req.body.subject);
        var fileId = mysql.format(req.body.fileId);
        var recievers = emails.split(',');
        var sql_select_file = `SELECT * FROM files WHERE fileId = ?`;
        //catching blockages
        try {
            //inserting
            //get connection
            con.query(sql_select_file, fileId, (err, result) => {
                if (result) {
                    //fetching user data
                    result.forEach(data => {
                        fileName = data.fileName;
                        description = data.description;
                    });
                    var transporter = mailHelper.transporter;
                    var EMAIL_USERNAME = process.env.PROTON_USERNAME;
                    // configration
                    const mailConfigurations = {
                        // It should be a string of sender email
                        from: EMAIL_USERNAME,
                        // Comma Separated list of mails
                        to: recievers,
                        // Subject of Email
                        subject: subject,
                        // This would be the text of email body
                        html: `<h2>Hi! There</h2> <h5> File receieved from your partner.. </h5>
 <br> <p> Sender :  ${user_Session.userName} </p> <br> <p> Desc : ${description}</p>`,
                        attachments: [
                            //{  
                            // utf-8 string as an attachment
                            // filename: 'text.txt',
                            //content: 'Hello, GeeksforGeeks Learner!'
                            // },
                            {
                                //filename and content type is derived from path
                                path: `./public/files/${fileName}`
                            }
                            //,{   
                            // path: './files/pdf.pdf'
                            // }
                        ]
                    };
                    transporter.sendMail(mailConfigurations, function(error, info) {
                        if (error) throw Error(error);
                        // if(error){
                        //   console.log(recievers);
                        // }
                        console.log('Email Sent and file sent Successfully');
                        req.session.message = 'file sent to .';
                        //console.log(info);
                    });
                }
                if (err) throw err;
            });
            //releasing connection,when done using it
        } catch (error) {
            console.log("can not send mail....");
        }
        //redirect back
        res.redirect('/home');
        //end
    });
    req.session.message='';
};
//logout user //clear session
logout = (req, res) => {
    req.session.destroy(function(err) {
        if (err) throw err;
        admin_Session.userId = '';
        admin_Session.role = '';
        user_Session.userId = '';
        user_Session.role = '';
        res.redirect("/login");
        console.log("logged out");
    });
};
//invalid route
error_404 = (req, res, next) => {
    //   res.status(404).send(`Requested page not found..
    // <br>
    // <a href='/' >Go Home</a>
    // `);
    res.render("../views/404.ejs");
};
//waitScreen
waitScreen = (req, res, next) => {
    res.render("../views/waitScreen.ejs");
};
//exports
module.exports = {
    globalVariables: globalVariables,
    //google auth
    authfailure: authfailure,
    authcallbacksuccess: authcallbacksuccess,
    index: index,
    login: login,
    waitScreen: waitScreen,
    auth: auth,
    register: register,
    dashboard: dashboard,
    fileUpload: fileUpload,
    filesView: filesView,
    filesLogs: filesLogs,
    deleteFile: deleteFile,
    editFile: editFile,
    filePreview: filePreview,
    fileUpdate: fileUpdate,
    emptyfiles: emptyfiles,
    viewDownloads: viewDownloads,
    deleteDownload: deleteDownload,
    emptydownload: emptydownload,
    viewUsers: viewUsers,
    deleteUsers: deleteUsers,
    AdddminUsers: AdddminUsers,
    emptyusers: emptyusers,
    viewCompanines: viewCompanines,
    emptycompanies: emptycompanies,
    editComp: editComp,
    deleteCompany: deleteCompany,
    addCompany: addCompany,
    updateCompany: updateCompany,
    deleteDepartment: deleteDepartment,
    emptydepartment: emptydepartment,
    addDepartment: addDepartment,
    updateDepartment: updateDepartment,
    viewDepartment: viewDepartment,
    editDept: editDept,
    viewLogs: viewLogs,
    deletelog: deletelog,
    emptylogs: emptylogs,
    viewErrLogs: viewErrLogs,
    delete_Errlog: delete_Errlog,
    emptyerror_logs: emptyerror_logs,
    adminProfile: adminProfile,
    FileRecovery: FileRecovery,
    emptyfileslogs: emptyfileslogs,
    filesLogsDwonloadsZip: filesLogsDwonloadsZip,
    // customer
    fetchCompanyId: fetchCompanyId,
    Customerhome: Customerhome,
    userProfile: userProfile,
    downloadFile: downloadFile,
    shareFile: shareFile,
    sendFile: sendFile,
    //fogrgot password
    forgotPassword: forgotPassword,
    accountVerification: accountVerification,
    verifyJwt: verifyJwt,
    updatePassword: updatePassword,
    // error 404
    error_404: error_404,
    // logout
    logout: logout
};