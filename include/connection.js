var mysql = require('mysql2');
require('dotenv').config();
// dotenv.config();
var con  = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port:3306,
 });

   con.connect(async (err)=> {
      if (err) throw err; // not connected!
   });
module.exports=con;


