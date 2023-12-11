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

async function addReview(userID, movieID, content){
    const query = "INSERT INTO reviews(user_id, movie_id, content) VALUES($1, $2, $3)";
    return await pgPool.query(query, [userID, movieID, content]);
}

async function deleteReview(reviewID){
    const query = "DELETE FROM reviews WHERE id = $1";
    return await pgPool.query(query, [reviewID]);
}

module.exports = { getReviews, getReviewById, addReview, deleteReview, getReviewByMovieId };