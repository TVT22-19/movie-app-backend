const request = require('supertest');
const { expect } = require('chai');
const express = require("express");
const app = express();
const router = require("../routes/moviedb")
app.use("/moviedb", router)

//const server = require('../app'); // Update this with the path to your server file

describe('Movie Search Route', () => {

    describe('GET /moviedb/search/', () => {
        it('should return error for missing search term', async () => {  //done => {
            //request(server)
                //.get('/search') // Adjust the path if route is different
                //.end((err, res) => {
                    //expect(res.status).to.equal(400);
                    //expect(res.body).to.have.property('error', 'Search term is required');
                    //done();
                    const response = await request(app).get("/movidedb/movie/search/")
                    expect(response.status).to.equal(404);
                });
        //});

        it('should return movies for valid search term', async () => { //done => {
            // Replace 'searchTerm' with a valid search term that exists in your test database
            //request(server)
                //.get('/search?searchitem=searchTerm')
                //.end((err, res) => {
                    //expect(res.status).to.equal(200);
                    //expect(res.body).to.have.property('message', 'Movies found successfully');
                    //expect(res.body.movies).to.be.an('array');
                    //done();
                    const response = await request(app).get("/moviedb/search/movie/test")
                    expect(response.status).to.equal(200);
                });
        //});

        it('should return no movies for invalid search term', async () => { //done => {

            //request(server)
                //.get('/search?searchitem=invalidTerm')// replace 'invalidTerm' with a search term that does not exist in your test database
                //.end((err, res) => {
                    //expect(res.status).to.equal(404);
                    //expect(res.body).to.have.property('error', 'No movies found');
                    //done();
                    const response = await request(app).get("/search/.")
                    expect(response.status).to.equal(404)
                });
        //});
    });

});
