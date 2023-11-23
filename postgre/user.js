const pgPool = require("./connection");

async function addUser(fname, lname, uname, pw){
    await pgPool.query("INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)", [uname, pw, fname, lname])
}

async function getUsers(){
    const result = await pgPool.query("SELECT * FROM users");
    return result.rows;
}

async function getUserByUsername(username){
    const result = await pgPool.query("SELECT * FROM users WHERE username=$1", [username]);
    return result.rows;
}



module.exports = { addUser, getUsers, getUserByUsername };