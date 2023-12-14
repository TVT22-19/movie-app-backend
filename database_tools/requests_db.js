const pgPool = require("../connection");
const {getUserById} = require("./user")

const sql = {
    ADD_REQUEST: 'INSERT INTO join_request (user_id, group_id) VALUES ($1, $2)', 
    DELETE_REQUEST: 'DELETE FROM join_request WHERE user_id=$1 AND group_id=$2',
    GET_OWNED_GROUPS: 'SELECT id, name FROM groups WHERE owner_id=$1',
    //GET_PENDING_REQUESTS: 'SELECT user_id FROM join_request WHERE group_id=$1',
    GET_PENDING_REQUESTS: 'SELECT users.id, users.username FROM users JOIN join_request ON user_id IN(users.id) WHERE join_request.group_id IN($1)'
}

async function addRequest(userid, groupid) {

    const result = await pgPool.query(sql.ADD_REQUEST, [userid, groupid]);
    return result.rows[0];

}

async function deleteRequest(userid, groupid) {

    const result = await pgPool.query(sql.DELETE_REQUEST, [userid, groupid]);
    return result.rows[0];

}
async function getOwnedGroups(ownerid) {
    let result = await pgPool.query(sql.GET_OWNED_GROUPS, [ownerid]);
    if (result.rows.length > 0) {
        return result.rows;
    } else {
        return null;
    }
}

async function getPendingRequests(groupid) {
    let result = await pgPool.query(sql.GET_PENDING_REQUESTS, [groupid]);
    if (result.rows.length > 0) {
        return result.rows;
    } else {
        return null;
    }
}

module.exports = {addRequest, deleteRequest, getOwnedGroups, getPendingRequests};