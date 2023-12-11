const pgPool = require("../connection");

async function getUsers(){
    const result = await pgPool.query("SELECT * FROM users");
    return result.rows;
}

async function getUserById(id){
    const result = await pgPool.query("SELECT * FROM users WHERE id=$1", [id]);
    return result.rows[0];
}

module.exports = { getUsers, getUserById };