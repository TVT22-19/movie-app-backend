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

async function addReview(userID, movieID, content, rating){
    const query = "INSERT INTO reviews(user_id, movie_id, content, rating) VALUES($1, $2, $3, $4)";
    return await pgPool.query(query, [userID, movieID, content, rating]);
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