const { Pool } = require('pg');
const pgMem = require('pg-mem');

const isTestEnv = process.env.NODE_ENV === 'test';
let pgPool;

if (isTestEnv) {
    const pgMemPool = new pgMem();
    pgPool = pgMemPool;
} else {
    pgPool = new Pool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,

    });
}

module.exports = pgPool;
