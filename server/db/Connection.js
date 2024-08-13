const mysql = require('mysql2');

const conn=my = mysql.createConnection({
    host: "localhost",  
    user: "root",
    password: "root",
    database: "smart_campus"
});

conn.connect(function(err) {
    if (err) throw err;
    console.log("db Connected sucessfully!");
});


module.exports = conn;