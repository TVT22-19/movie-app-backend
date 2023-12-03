const pgPool = require("../connection");

async function getReviews(){
    const result = await pgPool.query("SELECT * FROM reviews");
    return result.rows;
}

async function getReviewById(id){
    const result = await pgPool.query("SELECT * FROM reviews WHERE id=$1", [id]);
    return result.rows;
}

async function addReview(userID, movieID, content){
    const query = "INSERT INTO reviews(user_id, movie_id, content) VALUES($1, $2, $3)";
    const result = await pgPool.query(query, [userID, movieID, content]);
}

module.exports = { getReviews, getReviewById, addReview };