require("dotenv").config();
const express = require("express");
const router = express.Router();

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.ACCESS_TOKEN
    }
};

// Returns movie genres
router.get("/genres", async (req, res) => {
    fetch("https://api.themoviedb.org/3/genre/movie/list", options)
        .then(resp => resp.json())
        .then(data => {
            res.send(data);
        }).catch(console.error);
});

// Get details of the movie by ID
router.get("/:movieID", async (req, res) => {
    fetch("https://api.themoviedb.org/3/movie/" + req.params.movieID, options)
        .then(resp => resp.json())
        .then(data => {
            res.send(data);
        }).catch(console.error);
});

// Search the movie database
router.get("/search/:query", async (req, res) => {
    fetch("https://api.themoviedb.org/3/search/movie?query=" + req.params.query, options)
        .then(resp => resp.json())
        .then(data => {
            res.send(data);
        }).catch(console.error);
});

/* Image URLs:
    https://image.tmdb.org/t/p/<SIZE>/<IMG_ID>
    Sizes can be found from "https://api.themoviedb.org/3/configuration":
        eg. w300
            w780
            original
    Image ID can be found from movie details, or search results.
*/
module.exports = router;