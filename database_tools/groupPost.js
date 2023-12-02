const pgPool = require("../connection");

async function getPostsByGroupId(id){
    const result = await pgPool.query("SELECT * FROM group_posts WHERE group_id = $1", [id]);
    return result.rows;
}

async function createPost(title, userID, groupID, content){
    const query = "INSERT INTO group_posts(title, user_id, group_id, content) VALUES($1, $2, $3, $4)";
    const result = await pgPool.query(query, [title, userID, groupID, content]);
}

module.exports = { getPostsByGroupId, createPost };