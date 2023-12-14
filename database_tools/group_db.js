const pgPool = require("../connection");

const sql = {
    GET_GROUP: 'SELECT name, description, avatar_url FROM groups WHERE id=$1',
    GET_ALL_GROUPS: 'SELECT id, name FROM groups',
    ADD_GROUP: 'INSERT INTO groups (name, description, avatar_url, owner_id) VALUES ($1, $2, $3, $4) RETURNING id',
    DELETE_GROUP: 'DELETE FROM groups WHERE id=$1',
    GET_GROUP_MEMBERS: 'SELECT user_id FROM user_groups WHERE group_id=$1',
    GET_MEMBER_INFO: 'SELECT username, avatar_url FROM users WHERE id=$1',
    ADD_GROUP_MEMBER: 'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)',
    DELETE_GROUP_MEMBER: 'DELETE FROM user_groups WHERE user_id=$1 AND group_id=$2',
    USER_IS_MEMBER: "SELECT * FROM user_groups WHERE user_id = $1 AND group_id = $2",
    USER_IS_OWNER: "SELECT * FROM groups WHERE owner_id = $1 AND id = $2",
    GET_GROUPS_BY_USER: "SELECT * FROM user_groups WHERE user_id = $1"
}


async function getGroup(groupId) {
    let result = await pgPool.query(sql.GET_GROUP, [groupId]);
    if (result.rows.length > 0) {
        return result.rows[0];
    } else {
        return null;
    }
}
async function getGroupsByUser(userId) {
    let result = await pgPool.query(sql.GET_GROUPS_BY_USER, [userId]);
    if (result.rows.length > 0) {
        return result.rows;
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

//returns (user) ids, usernames and avatars 
async function getGroupMembers(groupId) {

    let result = await pgPool.query(sql.GET_GROUP_MEMBERS, [groupId]);

    if (result.rows.length > 0) {
        const groupMembersArray = result.rows.map(item => item.user_id); //array of just user ids e.g. [1, 2, 3]
        const memberInfoPromises = groupMembersArray.map(async userId => {
            const memberInfoResult = await pgPool.query(sql.GET_MEMBER_INFO, [userId]);
            const memberInfo = memberInfoResult.rows[0];
            return {
                id: userId,
                username: memberInfo.username,
                avatar: memberInfo.avatar_url,
            };
        });

        // wait for all promises to resolve
        const memberInfoArray = await Promise.all(memberInfoPromises);

        return memberInfoArray;
    } else {
        return null;
    }
}

async function addGroup(groupName, groupDescription, groupAvatar, groupOwner) {

    const addGroupResult = await pgPool.query(sql.ADD_GROUP, [groupName, groupDescription, groupAvatar, groupOwner]);
    const result = await pgPool.query(sql.ADD_GROUP_MEMBER, [groupOwner, addGroupResult.rows[0].id])
    return result.rows;

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

async function userIsMember(userID, groupID){
    const result = await pgPool.query(sql.USER_IS_MEMBER, [userID, groupID]);
    if(result.rowCount < 1){
        return false;
    }
    return true;
}

async function userIsOwner(userID, groupID){
    const result = await pgPool.query(sql.USER_IS_OWNER, [userID, groupID]);
    if(result.rowCount < 1){
        return false;
    }
    return true;
}




module.exports = { getGroup, getAllGroups, addGroup, getGroupMembers, addGroupMember, deleteGroupMember, deleteGroup, userIsMember, userIsOwner, getGroupsByUser };