var mysql = require('mysql');
require('dotenv').config();
// dotenv.config();
var pool  = mysql.createPool({
    connectionLimit : 20,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});



module.exports={
    pool:pool
}


