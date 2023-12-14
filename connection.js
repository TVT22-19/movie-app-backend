require("dotenv").config();
const { Pool } = require("pg");

const pgPool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

pgPool.connect((err) => {
    if(err){
        console.log(err.message);
    }
});


module.exports = pgPool;