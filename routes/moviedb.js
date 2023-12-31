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

// Search movies in the movie database
router.get("/search/movie/:query", async (req, res) => {
    fetch("https://api.themoviedb.org/3/search/movie?query=" + req.params.query, options)
        .then(resp => resp.json())
        .then(data => {
            res.send(data);
        }).catch(console.error);
});

// Search tv shows in the movie database
router.get("/search/tv/:query", async (req, res) => {
    fetch("https://api.themoviedb.org/3/search/tv?query=" + req.params.query, options)
        .then(resp => resp.json())
        .then(data => {
            res.send(data)
        }).catch(console.error);
})

// Returns full picture URL in json
router.get("/pic/:picID", async (req, res) => {
    res.send({ picture_url: "https://image.tmdb.org/t/p/original/" + req.params.picID });
})

/* Image URLs:
    https://image.tmdb.org/t/p/<SIZE>/<IMG_ID>
    Sizes can be found from "https://api.themoviedb.org/3/configuration":
        eg. w300
            w780
            original
    Image ID can be found from movie details, or search results.
*/
module.exports = router;
