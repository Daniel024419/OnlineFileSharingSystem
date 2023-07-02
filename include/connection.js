var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 20,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'fileServer'
});



module.exports={
    pool:pool
}


