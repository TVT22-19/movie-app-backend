const express = require("express");
const router = express.Router();

const { getReviews, getReviewById, addReview, deleteReview, getReviewByMovieId, getReviewsByUserId } = require("../database_tools/review");

/* GET reviews listing. */
router.get("/", async (req, res) => {
    try{
        const reviews = await getReviews();
        res.send(reviews);
    }catch(error){
        console.error("Error with database connection");
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
        console.error("Error with database connection");
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
        console.error("Error with database connection", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/* Add review */
router.post("/", async (req, res) => {
    const { userID, movieID, content } = req.body;
    if(!userID || !movieID || !content){
        return res.status(400).json({ error: "userID, movieID and content must not be empty" });
    }

    try{
        const dbResponse = await addReview(userID, movieID, content);
        res.status(200).json({ message: "Review added succesfully", database: dbResponse });
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:reviewID", async (req, res) => {
    if(!req.params.reviewID){
        return res.status(400).json({ error: "Review ID required" });
    }

    try{
        const dbResponse = await deleteReview(req.params.reviewID);
        res.status(200).json({ message: "Review deleted successfully", database: dbResponse });
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/userid/:userID", async (req, res) => {
    if(!req.params.userID){
        return res.status(400).json({ error: "User ID required" });
    }

    try{
        const reviews = await getReviewsByUserId(req.params.userID);
        reviews.forEach(element => {
            element.rating = element.rating.toString().trim()
        });
        console.log(reviews[0].rating)
        res.send(reviews);
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;
