const express = require("express");
const router = express.Router();
const pgPool = require("../connection");

router.get("/", async (req, res) => {
    const searchitem = req.query.searchitem;

    if (!searchitem) {
        return res.status(400).json({ error: "Search term is required" });
    }

    try {

        const searchQuery = "SELECT * FROM movies WHERE LOWER(title) LIKE LOWER($1)";
        const searchResult = await pgPool.query(searchQuery, [`%${searchitem}%`]);
        const movies = searchResult.rows;

        if (movies.length === 0) {
            return res.status(404).json({ error: "No movies found" });
        }

        res.status(200).json({ message: "Movies found successfully", movies });
    } catch (error) {
        console.error("Error while interacting with the database:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
