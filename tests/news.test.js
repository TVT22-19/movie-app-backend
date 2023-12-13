const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = express();

const newsRouter = require('../routes/news');
app.use('/news', newsRouter);

describe('News API', () => {
    it('should get a list of news articles', async () => {
        const response = await request(app).get('/news');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });
});
