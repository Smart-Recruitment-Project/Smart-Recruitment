const mysql = require('mysql2');
const db="placement";
const conn=my = mysql.createConnection({
    host: "localhost",  
    user: "root",
    password: "root",
    database: "placement"
});

conn.connect(function(err) {
    if (err) throw err;{
    console.log(`${db} Connected sucessfully!`);
    }
});


module.exports = conn;




