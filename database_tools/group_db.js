const pgPool = require("../connection");

const sql = {
    GET_GROUP: 'SELECT name, description, avatar_url FROM groups WHERE group_id=$1',
    GET_ALL_GROUPS: 'SELECT group_id, name FROM groups',
    ADD_GROUP: 'INSERT INTO groups (name, description, avatar_url) VALUES ($1, $2, $3)',
    DELETE_GROUP: 'DELETE FROM groups WHERE group_id=$1',
    ADD_GROUP_POST: '', //table for posts not created yet
    GET_GROUP_MEMBERS: 'SELECT user_id FROM user_groups WHERE group_id=$1',
    ADD_GROUP_MEMBER: 'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)',
    DELETE_GROUP_MEMBER: 'DELETE FROM user_groups WHERE user_id=$1 AND group_id=$2'
}


async function getGroup(groupId) {
    let result = await pgPool.query(sql.GET_GROUP, [groupId]);
    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        return null;
    }
}

async function getAllGroups() {
    let result = await pgPool.query(sql.GET_ALL_GROUPS);
    if (result.rows.length > 0) {
        return result.rows;
    } else {
        return null;
    }
}

//returns user ids as an array
async function getGroupMembers(groupId) {

    let result = await pgPool.query(sql.GET_GROUP_MEMBERS, [groupId]);

    if (result.rows.length > 0) {
        const groupMembersArray = result.rows.map(item => item.user_id);
        return groupMembersArray;
    } else {
        return null;
    }
}

async function addGroup(groupName, groupDescription, groupAvatar) {

    const addGroupResult = await pgPool.query(sql.ADD_GROUP, [groupName, groupDescription, groupAvatar]);
    return addGroupResult.rows[0];

}

//not functional yet
async function addGroupPost(groupId, postContent) {
    const addPostResult = await pgPool.query(sql.ADD_GROUP_POST, [groupId, userId, postContent]);
    return addPostResult.rows[0];
}


async function addGroupMember(userId, groupId) {
    //is it necessary to check if there are any duplicate user-group connections?
    const addMemberResult = await pgPool.query(sql.ADD_GROUP_MEMBER, [userId, groupId]);
    return addMemberResult.rows[0];

}
async function deleteGroupMember(userId, groupId) {
    const deleteMemberResult = await pgPool.query(sql.DELETE_GROUP_MEMBER, [userId, groupId]);
    return deleteMemberResult.rows[0];

}

async function deleteGroup(groupId) {

    const deleteGroupResult = await pgPool.query(sql.DELETE_GROUP, [groupId]);
    return deleteGroupResult.rows[0];

}


module.exports = { getGroup, getAllGroups, addGroup, addGroupPost, getGroupMembers, addGroupMember, deleteGroupMember, deleteGroup };