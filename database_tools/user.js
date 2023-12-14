const pgPool = require("../connection");

const sql = {
    GET_USERS: "SELECT id, username, registration_date, age, firstname, lastname, avatar_url FROM users",
    GET_USER_BY_ID: "SELECT id, username, registration_date, age, firstname, lastname, avatar_url FROM users WHERE id=$1",
    UPDATE_USER: "UPDATE users SET (username, password, age, firstname, lastname, avatar_url) = ($1, $2, $3, $4, $5, $6) WHERE id = $7",
    DELETE_USER_BY_ID: "DELETE FROM users WHERE id = $1"
}

async function getUsers(){
    const result = await pgPool.query(sql.GET_USERS);
    return result.rows;
}

async function getUserById(id){
    const result = await pgPool.query(sql.GET_USER_BY_ID, [id]);
    return result.rows[0];
}

async function updateUserById(username, password, age, firstname, lastname, avatar_url, id){
    const result = await pgPool.query(sql.UPDATE_USER, [username, password, age, firstname, lastname, avatar_url, id]);
    return result.rows;
}

async function deleteUserById(id){
    const result = await pgPool.query(sql.DELETE_USER_BY_ID, [id]);
    return result.rows;
}

module.exports = { getUsers, getUserById, updateUserById, deleteUserById };