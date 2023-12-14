const pgPool = require("../connection");

async function getReviews(){
    const result = await pgPool.query("SELECT * FROM reviews");
    return result.rows;
}

async function getReviewById(id){
    const result = await pgPool.query("SELECT * FROM reviews WHERE id=$1", [id]);
    return result.rows;
}
async function getReviewByMovieId(id){
    const result = await pgPool.query("SELECT * FROM reviews WHERE movie_id=$1", [id]);
    return result.rows;
}

async function addReview(user_id, movie_id, content, rating){
    const query = "INSERT INTO reviews(user_id, movie_id, content, rating, timestamp) VALUES($1, $2, $3, $4, NOW())";
    const response = await pgPool.query(query, [user_id, movie_id, content, rating]);
    return response.rows;
}

async function deleteReview(reviewID){
    const query = "DELETE FROM reviews WHERE id = $1";
    return await pgPool.query(query, [reviewID]);
}

async function getReviewsByUserId(userID){
    const result = await pgPool.query("SELECT * FROM reviews WHERE user_id = $1", [userID]);
    return result.rows;
}

module.exports = { getReviews, getReviewById, addReview, deleteReview, getReviewByMovieId, getReviewsByUserId };