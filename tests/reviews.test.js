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

    it('should add a review', async (done) => {
        const newReview = {
            user_id: 4,
            movie_id: 361743,
            content: 'Great movie!',
            rating: 5.3
        };
        /*
        const response = await request(app)
            .post('/reviews')
            .send(newReview)
        expect(response.status).to.equal(200);
        */
        request(app)
            .post('/reviews')
            .send(newReview)
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('object');
            });
        done();
    });

    it('should delete a review by ID', async () => {
        const response = await request(app).delete('/reviews/24');
        expect(response.status).to.equal(200);
    });
});
