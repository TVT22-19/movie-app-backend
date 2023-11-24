const pgPool = require("../connection");

const sql = {
    GET_GROUP: 'SELECT name, description, avatar_url FROM groups WHERE group_id=$1',
    ADD_GROUP: 'INSERT INTO groups (name, description, avatar_url) VALUES ($1, $2, $3)',
    DELETE_GROUP: 'DELETE FROM groups WHERE group_id=$1', 
    ADD_GROUP_POST: '',
    GET_GROUP_MEMBERS: 'SELECT user_id FROM user_groups WHERE group_id=$1',
    ADD_GROUP_MEMBER: 'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)', 
    DELETE_GROUP_MEMBER: 'DELETE FROM user_groups WHERE user_id=$1' 
}


async function getGroup(groupId){

        let result = await pgPool.query(sql.GET_GROUP, [groupId]);

        if(result.rows.length>0){
            return result.rows[0];
         }else{
            return null;
         }
}

async function getGroupMembers(groupId){

        let result = await pgPool.query(sql.GET_GROUP_MEMBERS, [groupId]);

        if(result.rows.length>0){
            const groupMembersArray = result.map(item => item.user_id);
            return groupMembersArray; //idk if this is the best move
         }else{
            return null;
         }
}

async function addGroup(groupName, groupDescription, groupAvatar){

    const addGroupResult = await pgPool.query(sql.ADD_GROUP, [groupName, groupDescription, groupAvatar]);
    return addGroupResult.rows[0];
    //error handling?
    
}

async function addGroupPost(groupId, postContent){

    const addPostResult = await pgPool.query(ADD_GROUP_POST, [groupId, postContent]);
    return addPostResult.rows[0];
    //do any errors need to be checked for here ._. 
}




module.exports = {getGroup, addGroup, addGroupPost, getGroupMembers};