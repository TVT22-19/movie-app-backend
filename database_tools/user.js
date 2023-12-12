const pgPool = require("../connection");

async function getUsers(){
    const result = await pgPool.query("SELECT * FROM users");
    return result.rows;
}

async function getUserById(id){
    const result = await pgPool.query("SELECT * FROM users WHERE id=$1", [id]);
    return result.rows[0];
}

async function updateUserById(username, password, age, firstname, lastname, avatar_url, id){
    const result = await pgPool.query("UPDATE users SET (username, password, age, firstname, lastname, avatar_url) = ($1, $2, $3, $4, $5, $6) WHERE id = $7",
                                        [username, password, age, firstname, lastname, avatar_url, id]);
    return result.rows;
}

module.exports = { getUsers, getUserById, updateUserById };