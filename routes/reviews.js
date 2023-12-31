const express = require("express");
const router = express.Router();
const { getReviews, getReviewById, addReview, deleteReview, getReviewByMovieId, getReviewsByUserId } = require("../database_tools/review");

/* GET reviews listing. */
router.get("/", async (req, res) => {
    try{
        const reviews = await getReviews();
        res.send(reviews);
    }catch(error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* Get review by ID */
router.get("/:id", async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ error: "Review ID is required" });
    }

    try{
        const review = await getReviewById(req.params.id);
        res.send(review);
    }catch(error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* Get review by movie ID */
router.get("/movieid/:id", async (req, res) => {
    if(!req.params.id){
        return res.status(400).json({ error: "Movie ID is required" });
    }

    try{
        const review = await getReviewByMovieId(req.params.id);
        res.send(review);
    }catch(error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* Add review */
router.post("/", async (req, res) => {
    const { user_id, movie_id, content, rating } = req.body;
    if(!user_id || !movie_id || !content || !rating){
        return res.status(400).json({ error: "userID, movieID, content and rating must not be empty" });
    }

    try{
        const dbResponse = await addReview(user_id, movie_id, content, rating);
        res.status(200).json({ message: "Review added succesfully", database: dbResponse });
    }catch(error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* Delete review by ID */
router.delete("/:reviewID", async (req, res) => {
    if(!req.params.reviewID){
        return res.status(400).json({ error: "Review ID required" });
    }

    try{
        const dbResponse = await deleteReview(req.params.reviewID);
        res.status(200).json({ message: "Review deleted successfully", database: dbResponse });
    }catch(error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

/* Get reviews by user ID */
router.get("/userid/:userID", async (req, res) => {
    if(!req.params.userID){
        return res.status(400).json({ error: "User ID required" });
    }

    try{
        const reviews = await getReviewsByUserId(req.params.userID);
        if(reviews.length < 1){
            return res.send([])
        }
        res.send(reviews);
    }catch(error){
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
