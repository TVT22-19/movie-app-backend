const pgPool = require("../connection");

const sql = {
  GET_POSTS_BY_GROUP_ID: 'SELECT * FROM group_posts WHERE group_id=$1',
  GET_USERNAME_BY_ID: 'SELECT username FROM users WHERE id=$1',
  CREATE_POST: "INSERT INTO group_posts(timestamp, title, user_id, group_id, content) VALUES(NOW(), $1, $2, $3, $4)",
  DELETE_POST: "DELETE FROM group_posts WHERE user_id = $1"
}

async function getPostsByGroupId(groupId) {
    try {
      const groupPostsResult = await pgPool.query(sql.GET_POSTS_BY_GROUP_ID, [groupId]);
      const groupPosts = groupPostsResult.rows;
      const postsWithUsernames = await Promise.all(
        groupPosts.map(async (post) => {
          const usernameResult = await pgPool.query(sql.GET_USERNAME_BY_ID, [post.user_id]);
          const username = usernameResult.rows[0]?.username || 'Unknown'; // default
          return { ...post, username };
        })
      );
  
      return postsWithUsernames;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

async function createPost(title, userID, groupID, content){
    const result = await pgPool.query(sql.CREATE_POST, [title, userID, groupID, content]);
    return result.rows;
}

async function deletePostByUserId(id){
    const result = await pgPool.query(sql.DELETE_POST, [id]);
    return result.rows;
}

module.exports = { getPostsByGroupId, createPost, deletePostByUserId };