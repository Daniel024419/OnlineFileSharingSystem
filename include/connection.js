var mysql = require('mysql');
require('dotenv').config();
// dotenv.config();
var con  = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements:true,
});

   con.connect(function(err) {
      if (err) throw err; // not connected!
   });
module.exports={
    con:con
}


