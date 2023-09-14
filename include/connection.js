// Import the MySQL package
var mysql = require('mysql');
require('dotenv').config();

// Create a connection variable using your environment variables
var con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    connectTimeout: 30000, // Set a longer timeout (in milliseconds)
});

// Connect to the database
con.connect(function (error) {
    if (error) {
        console.error('Error connecting to the database:', error);
        return;
    }
    console.log('Connected to the database!');
});

// Export the connection to use it in other parts of your application
module.exports = {
    con: con
};
