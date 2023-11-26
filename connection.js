require('dotenv').config();
const express = require("express");
const { Pool } = require('pg');


const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DB,
    user: process.env.PG_USER,
    password: process.env.PG_PW,
    //ssl: true
});

//test
pgPool.query('SELECT * FROM public."groups"', (err, result) => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
    } else {
        console.log('Connected to the database');
        console.log(result.rows);
    }
});

module.exports = pgPool;