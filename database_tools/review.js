const pgPool = require("../connection");
require("dotenv").config();

const sql = {
    GET_REVIEWS: "SELECT * FROM reviews",
    GET_REVIEW_BY_ID: "SELECT * FROM reviews WHERE id=$1",
    GET_REVIEW_BY_MOVIE_ID: "SELECT * FROM reviews WHERE movie_id=$1",
    ADD_REVIEW: "INSERT INTO reviews(user_id, movie_id, content, rating, timestamp) VALUES($1, $2, $3, $4, NOW())",
    DELETE_REVIEW: "DELETE FROM reviews WHERE id = $1",
    GET_REVIEWS_BY_USER_ID: "SELECT * FROM reviews WHERE user_id = $1"
}

const getMovieDetailsById = async (movieID) => {
    const options = {
        method: "GET",
        headers: {
            accept: "application/json",
            Authorization: "Bearer " + process.env.ACCESS_TOKEN
        }
    };
    try {
        console.log(movieID);
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieID}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  };


async function getReviews(){
    const result = await pgPool.query(sql.GET_REVIEWS);
    return result.rows;
}

async function getReviewById(id){
    const result = await pgPool.query(sql.GET_REVIEW_BY_ID, [id]);
    return result.rows;
}
async function getReviewByMovieId(id){
    const result = await pgPool.query(sql.GET_REVIEW_BY_MOVIE_ID, [id]);
    return result.rows;
}

async function addReview(user_id, movie_id, content, rating){
    const response = await pgPool.query(sql.ADD_REVIEW, [user_id, movie_id, content, rating]);
    return response.rows;
}

async function deleteReview(reviewID){
    const response = await pgPool.query(sql.DELETE_REVIEW, [reviewID]);
    return response.rows;
}

async function getReviewsByUserId(userID){
      try {
        const reviews  = await pgPool.query(sql.GET_REVIEWS_BY_USER_ID, [userID]);
        
        if (reviews.rows.length === 0) {
            return [];
        }
  
      const reviewsWithMovieNames = await Promise.all(
        reviews.rows.map(async (review) => {
            const movieId = review.movie_id;
            const movieResult = await getMovieDetailsById(movieId);
            const movieName = movieResult.original_title || 'Title not found';
            return { ...review, movieName };
        })
      )
        return reviewsWithMovieNames;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch review information.', error);
    }
}

module.exports = { getReviews, getReviewById, addReview, deleteReview, getReviewByMovieId, getReviewsByUserId };