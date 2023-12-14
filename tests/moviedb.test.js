const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = express();
const movieRouter = require('../routes/moviedb');
const moviedbRouter = require("../routes/moviedb");
app.use('/movies', moviedbRouter);

describe('Movie API', () => {
    it('should get a list of movie genres', async () => {
        const response = await request(app).get('/movies/genres');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object'); // shoulde be object with genres
    });

    it('should get details of a movie by ID', async () => {
        const response = await request(app).get('/movies/1'); // replace '1' with film ID
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });

    it('should search movies in the movie database', async () => {
        const response = await request(app).get('/movies/search/movie/Inception');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });
});
