const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = express();
const reviewRouter = require('../routes/reviews');
app.use('/reviews', reviewRouter);

describe('Review API', () => {
    it('should get a list of reviews', async () => {
        const response = await request(app).get('/reviews');
        expect(response.status).to.equal(200);
    });

    it('should get a review by ID', async () => {
        const response = await request(app).get('/reviews/1'); // replace'1' for actual id reviews
        expect(response.status).to.equal(200);
    });

    it('should add a review', async () => {
        const newReview = {
            userID: 1,
            movieID: 1,
            content: 'Great movie!',
        };
        const response = await request(app)
            .post('/reviews')
            .send(newReview);
        expect(response.status).to.equal(200);

    });

    it('should delete a review by ID', async () => {
        const response = await request(app).delete('/reviews/1');
        expect(response.status).to.equal(200);
    });
});
