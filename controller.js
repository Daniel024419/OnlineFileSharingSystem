//mysql
var mysql = require("mysql");
//importing connection
var importCon = require("./include/connection");
var con =importCon.con;
//bcrypt

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

//importing mails support
const mailHelper=require('./mailhelper');

//node mailer
const nodemailer = require('nodemailer');
// admin Object as session variables

const admin_Session = {
  userId: "",
  userName: "",
  gmail: "",
  role: "",
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
  res.locals.error_login=req.session.error_login;
  res.locals.error_register=req.session.error_register;
  res.locals.success_register=req.session.success_register;
  res.locals.error_forgot_pass=req.session.error_forgot_pass;
  res.locals.success_forgot_pass=req.session.success_forgot_pass;

  res.locals.success_update_pass=req.session.success_update_pass;
  res.locals.error_update_pass=req.session.error_update_pass;

  res.locals.verify_token=req.session.verify_token;

  next();
};

//index screen page get  /signnup get
index = (req, res) => {
// preventing unathorizedaccess to the page
  if(admin_Session.userId && admin_Session.role){
    //console.log(admin_Session.userId);
  res.redirect('/dashboard');
  }else if(user_Session.userId && user_Session.role){
  res.redirect('/home');
  }
  else{

  //company
  var sql_select_company = `SELECT * FROM company;SELECT * FROM department;SELECT * FROM users`;

  //catching blockages
  try {

      // con.query(sql_select_company, (err, result_company, fields) => {
      // con.query(sql_select_email, (err, result_check, fields) => {

        con.query(sql_select_company,(err, result_department, fields) => {
            if (result_department) {
              res.render("../views/register.ejs", {
                result_company: result_department[0],result_check:result_department[1],
                result_department: result_department[2]
              });
            }
            if (err) throw err;
            //releasing connection,when done using it
           
          }
        );
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

    var sql_check_user = `SELECT * FROM USERS WHERE GMAIL = ?`;
    //var sql_check_user = `SELECT * FROM USERS WHERE GMAIL = ? AND PASSWORD = ?`;

    //catching blockages
    try {
      //inserting
      
         
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
      bcrypt.compare(password,dbPassword,async function(err , verified){
        if (err) throw err;

        if(verified){
         
              // logins logs
              // Returns a random integer from 0 to 99999:
              var log_id = Math.floor(Math.random() * 99999);
              var logData = [, log_id, userId, new Date()];
              var sql_user_log = `INSERT INTO LOGS (id,log_id,user_id,created_at) VALUE (?,?,?,?)`;

              con.query(sql_user_log, logData, (err, result) => {
                if (result) {
                  // admin
                  if (role == 1) {
                    //fetching admin data
                    admin_Session.userId = userId;
                    admin_Session.userName = userName;
                    admin_Session.gmail = gmail;
                    admin_Session.role = role;
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
                    var error_messsage="Account does not have any role.";
                    req.session.error_login = error_messsage;
                    req.session.save();
                    res.redirect("/login");
                    
                  }
                }
                if (err) throw err;
              });
            
            //end
          }else{
         //error logs
              // Returns a random integer from 0 to 99999:
              var log_id = Math.floor(Math.random() * 99999);
              var errorlogData = [, log_id, gmail, password, new Date()];
              var sql_user_error_log = `INSERT INTO ERROR_LOGS (id,log_id,gmail,password,created_at)
          VALUES (?,?,?,?,?)`;

              con.query(
                sql_user_error_log,
                errorlogData,
                (err, result) => {
                  if (result) {
                    var error_messsage="Wrong password, Try again";
                    req.session.error_login = error_messsage;
                    req.session.save();
                    res.redirect("/login");
                     }
                  if (err) throw err;
                }
              );

          }

        
       });
            // end for verification
          } else {
            var error_messsage="Account does not exist.";
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

login = (req, res) => {
  if(admin_Session.userId!='' && admin_Session.role!=''){
  res.redirect('/dashboard');
  }else if(user_Session.userId!='' && user_Session.role!=''){
  res.redirect('/home');
  }
  else{
  res.render("../views/login.ejs");
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
    var userName = mysql.format(req.body.userName);
    var comp_id = mysql.format(req.body.company);
    var dept_id = mysql.format(req.body.department);
    var comp_id = mysql.format(req.body.company);
    var gmail = mysql.format(req.body.email);
    var password = mysql.format(req.body.password);
    var encrptypass='';
    //var fileName = req.file.filename;
    // var ext = path.extname(req.file.path);
    // var fileSize = req.file.size;

//encrption of the string password
    bcrypt.genSalt(10,function(err ,salt){
      if (err) throw err;
      //bcrppt for the password
      bcrypt.hash(password,salt, async function(err , hashpass){
      //log(hash);
        encrptypass=hashpass;
        //console.log(encrptypass);
    var role = 0;
    // Returns a random integer from 0 to 99999:
    var userId = Math.floor(Math.random() * 99999);

    var filData = [
      ,
      userId,
      userName,
      gmail,
      encrptypass,
      role,
      dept_id,
      comp_id,
      new Date()
    ];


    var sql_insert_users = `INSERT INTO users (id,userId,userName,
      gmail,password,role,dept_id,comp_id,created_at) 
     VALUES (?,?,?,?,?,?,?,?,?)`;

    //catching blockages
    try {
      //inserting
      
        
        //get connection
        con.query(sql_insert_users, filData, (err, result) => {
          if (result) {
                    var success_register="Account created successfully,you can now login";
                    req.session.success_register = success_register;
                    req.session.save();
                    res.redirect("/");
          }
          else{
                    var error_register="Account not created successfully,Try again";
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

//dashboard get admin
dashboard = (req, res) => {
  // preventing unathorizedaccess to the page

  if(admin_Session.userId=='' && admin_Session.role==''){
    res.redirect('/');
  }else{

  
  var sql_select_files = `SELECT * FROM FILES`;
  var sql_select_users = `SELECT * FROM USERS`;
  var sql_select_downloads = `SELECT * FROM DOWNLOADS`;
  var sql_select_company = `SELECT * FROM COMPANY`;

  //catching blockages
  try {
    //inserting
    
      
      //get connection
      con.query(sql_select_files, (err, result_files, fields) => {
        con.query(sql_select_users, (err, result_users, fields) => {
          con.query(
            sql_select_downloads,
            (err, result_downloads, fields) => {
              con.query(
                sql_select_company,
                (err, result_company, fields) => {
                  if (result_files) {
                    res.render("../views/admin/index.ejs", {
                      result_files: result_files,
                      result_users: result_users,
                      result_downloads: result_downloads,
                      result_company: result_company
                    });
                  }

                  if (err) throw err;
                  //releasing connection,when done using it
                  
                }
              );
            }
          );
        });
      });
     
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

var upload = multer({ storage: storage }).single("fileUpload");

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
    var chars='01234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnompqrstuvwxyz';
    var fileId='';


for (var i=0;i<25; i++) {
  var rnum=Math.floor(Math.random()*chars.length);
  fileId += chars.substring(rnum,rnum+1);
}
//console.log(fileId)
    // end
    var fileData = [
      ,
      fileId,
      comp_id,
      dept_id,
      description,
      fileName,
      ext,
      fileSize,
      new Date()
    ];
    var sql_insert_file = `INSERT INTO FILES (id,fileId,comp_id,dept_id,description,fileName,fileType,fileSize,created_at) 
     VALUES (?,?,?,?,?,?,?,?,?)`;

    //catching blockages
    try {
      //inserting
      
        
        //get connection
        con.query(sql_insert_file, fileData, (err, result) => {
          if (result) {
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
};

//files view
filesView = (req, res) => {
  if(admin_Session.userId=='' && admin_Session.role==''){
    res.redirect('/login');
  }else{
  var sql_select_file = `SELECT * FROM FILES ORDER BY created_at desc`;
  //company
  var sql_select_company = `SELECT * FROM COMPANY`;

  //company
  var sql_select_department = `SELECT * FROM DEPARTMENT`;

  //catching blockages
  try {
    //inserting
    
      
      //get connection
      con.query(sql_select_file, (err, result, fields) => {
        con.query(sql_select_company, (err, result_company, fields) => {
          con.query(
            sql_select_department,
            (err, result_department, fields) => {
              if (result) {
                res.render("../views/admin/files.ejs", {
                  result: result,
                  result_company: result_company,
                  result_department: result_department
                });
              }

              if (err) throw err;
              //releasing connection,when done using it
              
            }
          );
        });
      });
  } catch (error) {
    console.log("can not select....");
  }
}
};

// delete files

deleteFile = (req, res) => {
  var fileId = req.params.fileId;
 // console.log(fileId);
  var sql_delete_file = `DELETE FROM FILES WHERE fileId = ?`;
  try {
    //inserting
    
      
      //get connection
      con.query(sql_delete_file, fileId, (err, result, fields) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.redirect("back");
        }  

        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not delete....");
  }
};

// edit files
//get
editFile = (req, res) => {
 // preventing unathorizedaccess to the page

 if(admin_Session.userId=='' && admin_Session.role==''){
  res.redirect('/login');
}else{

  var fileId = req.params.fileId;
  //console.log(fileId);
  var sql_select_file = `SELECT * FROM FILES WHERE fileId = ?`;
  //company
  var sql_select_company = `SELECT * FROM COMPANY`;

  //company
  var sql_select_department = `SELECT * FROM DEPARTMENT`;

  try {
    //inserting
    
      
      con.query(sql_select_company, (err, result_company, fields) => {
        
        con.query(
          sql_select_department,
          (err, result_department, fields) => {
            
            //get connection
            con.query(sql_select_file, fileId, (err, result, fields) => {
              if (result) {
                res.render("../views/admin/filesEdit.ejs", {
                  result: result,
                  result_company: result_company,
                  result_department: result_department
                });
              }

              if (err) throw err;
              //releasing connection,when done using it
              
            });
          }
        );
      });
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

 if(admin_Session.userId=='' && admin_Session.role==''){
  res.redirect('/login');
  }else{

  var fileId = req.params.fileId;
  //console.log(fileId);
  var sql_preview_file = `SELECT * FROM FILES WHERE fileId = ?`;

  try {
    //inserting
    
      //get connection
      con.query(sql_preview_file, fileId, (err, result, fields) => {
        if (result) {
          res.render("../views/admin/filePreview.ejs", { result: result });
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not select....");
  }
}
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
};
// end

//emptyfiles
emptyfiles = (req, res) => {
  var sql_empty_logs = `TRUNCATE TABLE FILES`;
  try {
    //inserting
    
      
      //get connection
      con.query(sql_empty_logs, (err, result, fields) => {
        if (result) {
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
// end
//view  downloads
viewDownloads = (req, res) => {
  // preventing unathorizedaccess to the page

  if(admin_Session.userId=='' && admin_Session.role==''){
    res.redirect('/login');
  }else{

  var sql_select_dowwnloads = `SELECT * FROM downloads`;
  var sql_select_files_audio = `SELECT * FROM downloads WHERE 
                                fileType = '.mp3' OR fileType = '.m4a' OR fileType = '.wma'
                                 OR fileType = '.acc' OR fileType = '.wav' OR fileType = '.flac'`;

  var sql_select_files_video = `SELECT * FROM downloads WHERE 
                                fileType = '.mp4' OR fileType = '.avi' OR fileType = '.mpeg-2'
                                 OR fileType = '.webm' OR fileType = '.mkv' OR fileType = '.mov'`;

  var sql_select_files_doc = `SELECT * FROM downloads WHERE 
                                fileType = '.pdf' OR fileType = '.dot' OR fileType = '.doc' OR fileType = '.docm'
                                OR fileType = '.docx' OR fileType = '.ppt' OR fileType= '.txt' OR fileType = '.csv'`;

  var sql_select_files_image = `SELECT * FROM downloads WHERE 
                                fileType = '.gif' OR fileType = '.png' OR fileType = '.jpg'
                                 OR fileType = '.jpeg'`;
  //catching blockages
  try {
    //inserting
    
      
      con.query(
        sql_select_files_audio,
        (err, result_files_audio, fields) => {
          con.query(
            sql_select_files_video,
            (err, result_files_video, fields) => {
              con.query(
                sql_select_files_doc,
                (err, result_files_doc, fields) => {
                  con.query(
                    sql_select_files_image,
                    (err, result_files_image, fields) => {
                      con.query(
                        sql_select_dowwnloads,
                        (err, result_downloads, fields) => {
                          

                          if (result_downloads) {
                            res.render("../views/admin/downloads.ejs", {
                              result_downloads: result_downloads,
                              result_files_audio: result_files_audio,
                              result_files_video: result_files_video,
                              result_files_doc: result_files_doc,
                              result_files_image: result_files_image
                            });
                          }

                          if (err) throw err;
                          //releasing connection,when done using it
                          
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
   } catch (error) {
    console.log("can not select....");
  }
}
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
          res.redirect("black");
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not delete....");
  }
};

//end

//emptyfiles
emptydownload = (req, res) => {
  var sql_empty_logs = `TRUNCATE TABLE DOWNLOADS`;
  try {
    //inserting
    
      
      //get connection
      con.query(sql_empty_logs, (err, result, fields) => {
        if (result) {
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

//emptycompanies
emptycompanies = (req, res) => {
  var sql_empty_logs = `TRUNCATE TABLE COMPANY`;
  try {
    //inserting
    
      
      //get connection
      con.query(sql_empty_logs, (err, result, fields) => {
        if (result) {
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
// end


//view  companines
viewCompanines = (req, res) => {
 // preventing unathorizedaccess to the page

 if(admin_Session.userId=='' && admin_Session.role==''){
  res.redirect('/login');
}else{

  var sql_select_company = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM company`;

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

    //console.log(compName);
    // Returns a random integer from 0 to 99999:
    var comp_id = Math.floor(Math.random() * 99999);

    var fileData = [
      ,
      comp_id,
      compName,
      comptLocation,
      comptel,
      compMail,
      new Date()
    ];
    var sql_insert_company = `INSERT INTO company (id,comp_id, comp_name, comp_location, comp_tel, comp_mail ,created_at) 
   VALUES (?,?,?,?,?,?,?)`;

    //catching blockages
    try {
      //inserting
      
        

        con.query(
          sql_insert_company,
          fileData,
          (err, result, fields) => {
            

            if (result) {
              res.redirect("back");
            }

            if (err) throw err;
            //releasing connection,when done using it
            
          }
        );
     } catch (error) {
      console.log("can not insert....");
    }
  });
};
// end
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
          res.redirect("back");
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not delete....");
  }
};

//view  companines get
viewDepartment = (req, res) => {
  // preventing unathorizedaccess to the page

  if(admin_Session.userId=='' && admin_Session.role==''){
    res.redirect('/login');
  }else{

  var sql_select_department = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM department ORDER BY created_at desc`;
  var sql_select_company = `SELECT * FROM COMPANY ORDER BY created_at desc`;

  //catching blockages
  try {
    //inserting
    
      

      con.query(
        sql_select_department,
        (err, result_department, fields) => {
          
          con.query(
            sql_select_company,
            (err, result_company, fields) => {
              
              if (result_department) {
                res.render("../views/admin/department.ejs", {
                  result_department: result_department,
                  result_company: result_company
                });
              }

              if (err) throw err;
              //releasing connection,when done using it
              
            }
          );
        }
      );
   } catch (error) {
    console.log("can not select....");
  }
}
};
// end
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

    var fileData = [
      ,
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
      
        

        con.query(
          sql_insert_department,
          fileData,
          (err, result_department, fields) => {
            

            if (result_department) {
              res.redirect("back");
            }

            if (err) throw err;
            //releasing connection,when done using it
            
          }
        );
     } catch (error) {
      console.log("can not insert....");
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
          res.redirect("back");
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not delete....");
  }
};


//end 
//emptydepartment
emptydepartment = (req, res) => {
  var sql_empty_logs = `TRUNCATE TABLE DEPARTMENT`;
  try {
    //inserting
    
      
      //get connection
      con.query(sql_empty_logs, (err, result, fields) => {
        if (result) {
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
//view  users
//get
viewUsers = (req, res) => {
 // preventing unathorizedaccess to the page

 if(admin_Session.userId=='' && admin_Session.role==''){
  res.redirect('/login');
}else{

  var sql_select_users = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM USERS ORDER BY created_at desc`;

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
};
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
          res.redirect("back");
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not delete....");
  }
};
// VIEW admin user

//emptyusers
// empty logs

emptyusers = (req, res) => {
  var sql_empty_logs = `TRUNCATE TABLE USERS`;
  try {
    //inserting
    
      
      //get connection
      con.query(sql_empty_logs, (err, result, fields) => {
        if (result) {
          res.redirect("back");
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not TRUNCATE....");
  }
};
//end

//view  logs
//get
viewLogs = (req, res) => {
 // preventing unathorizedaccess to the page

 if(admin_Session.userId=='' && admin_Session.role==''){
  res.redirect('/login');
}else{

  var sql_select_logs = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM LOGS ORDER BY created_at ASC`;

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
          res.redirect("back");
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not delete....");
  }
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
          res.redirect("back");
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not TRUNCATE....");
  }
};

//viewErrLogs
//view  err logs
//get
viewErrLogs = (req, res) => {
 // preventing unathorizedaccess to the page

 if(admin_Session.userId=='' && admin_Session.role==''){
  res.redirect('/login');
}else{

  var sql_select_err_logs = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM ERROR_LOGS ORDER BY created_at ASC`;

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
};
// end
// delete err log

delete_Errlog = (req, res) => {
  var Id = req.params.id;
  var sql_delete_log = `DELETE FROM ERROR_LOGS WHERE id = ?`;
  try {
    //inserting
    
      
      //get connection
      con.query(sql_delete_log, Id, (err, result, fields) => {
        if (result) {
          res.redirect("back");
        }

        if (err) throw err;
        //releasing connection,when done using it
        
      });
   } catch (error) {
    console.log("can not delete....");
  }
};


// end

// empty err logs

emptyerror_logs = (req, res) => {
  var sql_empty_logs = `TRUNCATE TABLE ERROR_LOGS`;
  try {
    //inserting
    
      
      //get connection
      con.query(sql_empty_logs, (err, result, fields) => {
        if (result) {
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

 if(admin_Session.userId=='' && admin_Session.role==''){
  res.redirect('/login');
}else{

  var userId = admin_Session.userId;
  var sql_view_admin_user = `SELECT * FROM USERS WHERE userId = ?`;
  try {
    //inserting
    
      
      //get connection
      con.query(
        sql_view_admin_user,
        userId,
        (err, result_admin_profile, fields) => {
          if (result_admin_profile) {
            res.render("../views/admin/profile.ejs", {
              result_admin_profile: result_admin_profile
            });
          }

          if (err) throw err;
          //releasing connection,when done using it
          
        }
      );
   } catch (error) {
    console.log("can not select....");
  }
}
};

//customer
//view  downloads
Customerhome = (req, res) => {

  //preventing unauthorised access 
   if(user_Session.userId=='' && user_Session.role==''){
    res.redirect('/login');
  }else{
  var sql_select_files_all = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM FILES ORDER BY created_at DESC`;

  var sql_select_files_audio = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM FILES WHERE 
                                fileType = '.mp3' OR fileType = '.m4a' OR fileType = '.wma'
                                 OR fileType = '.acc' OR fileType = '.wav' OR fileType = '.flac'`;

  var sql_select_files_video = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM FILES WHERE 
                                fileType = '.mp4' OR fileType = '.avi' OR fileType = '.mpeg-2'
                                 OR fileType = '.webm' OR fileType = '.mkv' OR fileType = '.mov'`;

  var sql_select_files_doc = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM FILES WHERE 
                                fileType = '.pdf' OR fileType = '.dot' OR fileType = '.doc' OR fileType = '.docm'
                                OR fileType = '.docx' OR fileType = '.ppt' OR fileType= '.txt' OR fileType = '.csv'`;

  var sql_select_files_image = `SELECT * , Day(created_at) AS Day,Year(created_at) AS Year,Month(created_at) AS Month FROM FILES WHERE 
                                fileType = '.gif' OR fileType = '.png' OR fileType = '.jpg'
                                 OR fileType = '.jpeg'`;
  //catching blockages
  try {
    //inserting
    
       

      con.query(
        sql_select_files_all,
        (err, result_files_all, fields) => {

          // audio
          con.query(
            sql_select_files_audio,
            (err, result_files_audio, fields) => {
              con.query(
                sql_select_files_video,
                (err, result_files_video, fields) => {
                  con.query(
                    sql_select_files_doc,
                    (err, result_files_doc, fields) => {
                      con.query(
                        sql_select_files_image,
                        (err, result_files_image, fields) => {
                          

                          if (result_files_all) {

                             // result_files_all.forEach(file =>{
                             // console.log(file.Year);

                             //   });
                            res.render("../views/customer/index.ejs", {
                              result_files_all: result_files_all,
                              result_files_audio: result_files_audio,
                              result_files_video: result_files_video,
                              result_files_doc: result_files_doc,
                              result_files_image: result_files_image
                            });
                          }

                          if (err) throw err;
                          //releasing connection,when done using it
                          
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
   } catch (error) {
    console.log("can not select....");
  }
}
};

// VIEW  user profile

userProfile = (req, res) => {
  
  //preventing unauthorised access  
  if(user_Session.userId=='' && user_Session.role==''){
    res.redirect('/login');
  }else{
  var userId = user_Session.userId;
  var sql_view_user = `SELECT * FROM USERS WHERE userId = ?`;
  try {
    //inserting
    
      
      //get connection
      con.query(
        sql_view_user,
        userId,
        (err, result_user_profile, fields) => {
          if (result_user_profile) {
            res.render("../views/customer/profile.ejs", {
              result_user_profile: result_user_profile
            });
          }

          if (err) throw err;
          //releasing connection,when done using it
          
        }
      );
   } catch (error) {
    console.log("can not select....");
  }
  }
};
// download file

downloadFile = (req, res ,next ) => {
  var fileType,fileId;
  var id = req.params.id;
  var fileName = req.params.fileName;
   
  // The folder path for the files
  const folderPath = __dirname + "/public/files";
   
 // try {
   var sql_select_file = `SELECT * FROM FILES WHERE id = ?`;

    var sql_download = `INSERT INTO downloads (id,userId,fileId,fileType,comp_id,dept_id,email,created_at) VALUES (?,?,?,?,?,?,?,?)`;
    
      
      con.query(sql_select_file,id,(err, result_select_files) => {

        if(result_select_files){
          result_select_files.forEach( data => {
            fileType = data.fileType;
            fileId =data.fileId;
          });


      var downloadData = [
      ,
      user_Session.userId,
      fileId,fileType,
      user_Session.dept_id,
      user_Session.comp_id,
      user_Session.gmail,
      new Date()];

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
      // 	{ path: folderPath+'/multiple_one_gfg.txt',
      // 		name: 'one_gfg.txt'},
      // 	{ path: folderPath+'/multiple_two_gfg.txt',
      // 		name: 'two_gfg.txt'},
      // 	{ path: folderPath+'/multiple_three_gfg.txt',
      // 		name: 'three_gfg.txt'}
      // ])
               // Download function
              res.download(folderPath + "/" + fileName, function(err) {
                if (err) {
                  console.log(err);
                }
              });
  // } catch (error) {
  //   console.log("can not download....");
  // }
  
};

///jwt
const jwt = require('jsonwebtoken');

//forgot pass
forgotPassword = (req, res) => {
  //preventing unauthorised access  
  if(user_Session.userId=='' && user_Session.role==''){
    res.redirect('/login');
    req.session.destroy();
  }else{
  res.render("../views/forgotPassword.ejs");
  req.session.destroy();
  }
};


//forgot account Verification post
accountVerification = (req, res, err) => {
  upload(req, res, function(err) {
    if (err) {
      return res.end("Error geting  data.");
    }
    var dbGmail,userName,userId;
    //checking sql injection
    var gmail = mysql.format(req.body.email);
    //console.log(gmail);
    
    var sql_verify_user = `SELECT * FROM USERS WHERE GMAIL = ?`;
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
            userId=data.userId;
          });
        //verifying user info
if(dbGmail === gmail){
  // if(email === dbGmail && username === dbuserName){
   var transporter=mailHelper.transporter;
   var token=mailHelper.token;
   var EMAIL_USERNAME=process.env.EMAIL_USERNAME;
   // var user= dbuserName.toUpperCase();
   //send token after verifying password
   const mailConfigurations = {
 
     // It should be a string of sender/server email
     from: EMAIL_USERNAME,
   
     to: dbGmail,
     // Subject of Email
     subject: 'Account Recovery Verification',
     
     // This would be the text of email body
   //  + user +
     text: `Hi! There, You have recently visited
       our website and entered your email.
       Please follow the given link to verify your email
       http://localhost:3030/verify/${token}/${userId}
       Thanks`
     
   };
  
   transporter.sendMail(mailConfigurations, function(error, info){
     if (error) throw Error(error);
     if(error){
      console.log('no internet to send mail');
     }
     console.log('Email Sent Successfully');
     console.log(info);

     var success_messsage="Token has been sent to the gmail provide, click to verify your account";
                    req.session.success_forgot_pass = success_messsage;
                    req.session.save();
                    res.redirect("/forgot/password");
   });
   
   
 }else{
     var error_messsage_pass="No Account is associated with this gmail, Try again";
                    req.session.error_forgot_pass = error_messsage_pass;
                    req.session.save();
                    res.redirect("/forgot/password");
   //redirect back
 }
          }else{
                    var error_messsage_pass="No Account is associated with this gmail ";
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
            var error_messsage_pass="Account verification faild,try again";
                    req.session.error_forgot_pass = error_messsage_pass;
                    req.session.save();
          res.redirect("/forgot/password");
        }
        else {
          //success
                    var verify_token_message="Account verification succeeded,change your password here";
                    req.session.verify_token = verify_token_message;
                    req.session.save();
            res.render("../views/updatePassword.ejs", {userId:userId});
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
    //var repassword = mysql.format(req.body.repassword);
    var userId = mysql.format(req.body.userId);

    var fileData = [ password ,userId ];
    sql_update_user_pass = `UPDATE USERS SET PASSWORD = ? WHERE userId = ?`;
     
    //catching blockages
    try {
      //inserting
      
        

        con.query(
          sql_update_user_pass, fileData,
          (err, result_update_pass, fields) => {
            

            if(result_update_pass) {
             //redirect back
              var update_success_message="Account recovered successfully,login here";
                    req.session.success_update_pass = update_success_message;
                    req.session.save();
            res.redirect('/login');
            }else{
                    var update_error_message="Could not update account successfully,Try again";
                    req.session.error_update_pass = update_error_message;
                    req.session.save();
              //with response message ,try again
              res.redirect('/forgot/password');
            }

            if (err) throw err;
            //releasing connection,when done using it
            
          }
        );
     } catch (error) {
      console.log("can not update....");
    }
  });
};



//share files get
shareFile = (req, res) => {

  //preventing unauthorised access  
  if(user_Session.userId=='' && user_Session.role==''){
    res.redirect('/login');
    req.session.destroy();
  }else{
  var fileId = req.params.fileId;
  var sql_select_file = `SELECT * FROM FILES WHERE FILEID = ?`;

  //catching blockages
  try {
    //inserting
    
      
      //get connection
      con.query(sql_select_file,fileId,(err, result_files, fields) => {

              if (result_files) {
                res.render("../views/shareFile.ejs",
                {result_files:result_files});
              }

              if (err) throw err;
              //releasing connection,when done using it
              
            }
          );
      
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
    var fileName,description;
    //checking sql injection
    var emails = mysql.format(req.body.email);
    var subject = mysql.format(req.body.subject);
    var fileId = mysql.format(req.body.fileId);
    
    var recievers=emails.split(',');
    var sql_select_file = `SELECT * FROM FILES WHERE FILEID = ?`;
    //catching blockages
    try {
      //inserting
      
        
        //get connection
        con.query(sql_select_file, fileId, (err, result) => {
         
          if (result) {
             //fetching user data
          result.forEach(data => {
            fileName = data.fileName;
            description=data.description;
          });
 
   var transporter=mailHelper.transporter;
   var EMAIL_USERNAME=process.env.EMAIL_USERNAME;
  // configration
const mailConfigurations = {

  // It should be a string of sender email
  from:EMAIL_USERNAME,
  
  // Comma Separated list of mails
  to:recievers,
  // Subject of Email
 subject:subject,
  
  // This would be the text of email body
 html: `<h2>Hi! There</h2> <h5> File receieved from your partner.. </h5>
 <br> <p> ${user_Session.userName} </p> <br> <p> Desc : ${description}</p>`  ,
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
  
   transporter.sendMail(mailConfigurations, function(error, info){
      
     if (error) throw Error(error);
      // if(error){
      //   console.log(recievers);
      // }
     console.log('Email Sent and file sent Successfully');
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
};



//logout user //clear session
logout = (req, res) => {

  req.session.destroy(
   function (err) {
    if(err) throw err;
    admin_Session.userId='';
    admin_Session.role='';
    user_Session.userId='';
    user_Session.role='';
    res.redirect("/login");
   console.log("logged out");
   
   });
 
  
};

//invalid route
error_404 = (req, res, next) => {
  res.status(404).send(`Requested page not found..
  <br>
  <a href='/' >Go Home</a>
  `);
  next();
};

//exports

module.exports = {
  globalVariables: globalVariables,
  index: index,
  login: login,
  auth: auth,
  register: register,
  dashboard: dashboard,
  fileUpload: fileUpload,
  filesView: filesView,
  deleteFile: deleteFile,
  editFile: editFile,
  filePreview: filePreview,
  fileUpdate: fileUpdate,emptyfiles:emptyfiles,
  viewDownloads: viewDownloads,
  deleteDownload: deleteDownload,emptydownload:emptydownload,
  viewUsers: viewUsers,
  deleteUsers: deleteUsers,emptyusers:emptyusers,
  viewCompanines: viewCompanines,emptycompanies:emptycompanies,
  deleteCompany: deleteCompany,
  addCompany: addCompany,
  deleteDepartment: deleteDepartment,emptydepartment:emptydepartment,
  addDepartment: addDepartment,
  viewDepartment: viewDepartment,
  viewLogs:viewLogs,deletelog:deletelog,
  emptylogs:emptylogs,viewErrLogs:viewErrLogs,
  delete_Errlog:delete_Errlog,emptyerror_logs:emptyerror_logs,
  adminProfile: adminProfile,
  // customer
  Customerhome: Customerhome,
  userProfile: userProfile,
  downloadFile: downloadFile,
  shareFile:shareFile,
  sendFile:sendFile,
  //fogrgot password
  forgotPassword:forgotPassword,
  accountVerification:accountVerification,
  verifyJwt:verifyJwt,
  updatePassword:updatePassword,
  // error 404
  error_404: error_404,
  // logout
  logout: logout
};
