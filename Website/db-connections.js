// import the mysql2 library
var mysql = require('mysql2');

// create the connection to the database
var connection = mysql.createConnection({
host: 'localhost', // IP of database server
port: '3306', // port of database server
user: 'root', // user of database server
password: 'ShubhamKaushik2006', // password of database server
database: 'e-commerce' // database connecting to
});

//Test Connection 
connection.connect(err => { //test out connection and if there is error console.log the error
    if (err) throw err;
    console.log('Connected to DB');
});

// Export the connections so that is can be used by others script
module.exports = connection;