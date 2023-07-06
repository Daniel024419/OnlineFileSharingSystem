//importing mysql instances from the package
var mysql = require('mysql');
require('dotenv').config();
try{
//creating connection variables
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
con.connect((error)=> {
    
    try{
    // throwing error /exception
   // if (error) throw error;
    if(error){

        console.log(error);


        console.log("Xampp not connected");
    }
}
catch(ex){
 console.log("database error,xampp is not running");
}

});

// exporting connection to be used globally
module.exports={
    con:con
}
}
catch(ex){
 console.log("database error,xampp is not running");
}
