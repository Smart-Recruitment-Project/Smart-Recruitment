const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

// Execute a query
pool.query('SELECT * FROM your_table', (error, results, fields) => {
    if (error) {
        console.error('Error executing query:', error);
        return;
    }

    // Process the query results
    console.log('Query results:', results);
});

// Close the connection pool when done
pool.end();