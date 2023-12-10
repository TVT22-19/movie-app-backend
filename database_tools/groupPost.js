const pgPool = require("../connection");

async function getPostsByGroupId(groupId) {
    try {
      const groupPostsResult = await pgPool.query('SELECT * FROM group_posts WHERE group_id=$1', [groupId]);
      const groupPosts = groupPostsResult.rows;
      const postsWithUsernames = await Promise.all(
        groupPosts.map(async (post) => {
          const usernameResult = await pgPool.query('SELECT username FROM users WHERE id=$1', [post.user_id]);
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
    const query = "INSERT INTO group_posts(timestamp, title, user_id, group_id, content) VALUES(NOW(), $1, $2, $3, $4)";
    const result = await pgPool.query(query, [title, userID, groupID, content]);
}

async function deletePostByUserId(id){
    const query = "DELETE FROM group_posts WHERE user_id = $1";
    const result = await pgPool.query(query, [id]);
}

module.exports = { getPostsByGroupId, createPost, deletePostByUserId };