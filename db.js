//db.js file code
const { Pool } = require('pg');

// Configure the PostgreSQL connection pool
const pool = new Pool({
    user: 'posttest', // Replace with your PostgreSQL username
    host: 'localhost', // Database host
    database: 'swe_proj', // Replace with your database name
    password: 'postgres', // Replace with your PostgreSQL password
    port: 5432, // Default PostgreSQL port
});

// Function to execute queries
const query = (text, params) => {
    return pool.query(text, params);
};

module.exports = {
    query,
};
// module.exports = {
//     query: (text, params) => pool.query(text, params),
// };

