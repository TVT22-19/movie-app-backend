//require connection

const sql = {
    GET_GROUP: 'SELECT name, description, avatar_url FROM groups WHERE group_id=$1',
    ADD_GROUP: 'INSERT INTO groups (name, description, avatar_url) VALUES ($1, $2, $3)',
    DELETE_GROUP: 'DELETE FROM groups WHERE group_id=$1', 
    ADD_GROUP_POST: '',
    GET_GROUP_MEMBERS: 'SELECT user_id FROM user_groups WHERE group_id=$1',
    ADD_GROUP_MEMBER: 'INSERT INTO user_groups (user_id, group_id) VALUES ($1, $2)', 
    DELETE_GROUP_MEMBER: '' 
}


async function getGroup(groupId){

    if (groupId){

        let result = ''; //query
    }
    else {

        return null;
    }
}
async function addGroup(groupName, groupDescription){

    if (groupId){

        let result = ''; //query
    }
    else {

        return null;
    }
}


module.exports = {getGroup, addGroup};