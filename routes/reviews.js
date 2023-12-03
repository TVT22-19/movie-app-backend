const express = require("express");
const router = express.Router();

const { getReviews, getReviewById, addReview } = require("../database_tools/review");

/* GET reviews listing. */
router.get("/", async (req, res) => {
    console.log(new Date());
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

/* Add review */
router.post("/", async (req, res) => {
    const { userID, movieID, content } = req.body;
    if(!userID || !movieID || !content){
        return res.status(400).json({ error: "userID, movieID and content must not be empty" });
    }

    try{
        const dbResponse = await addReview(userID, movieID, content);
        res.status(201).json({ message: "Review added succesfully", database: dbResponse });
    }catch(error){
        console.error("Error with database connection");
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
