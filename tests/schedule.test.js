const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = express();


const scheduleRouter = require('../routes/schedule');
app.use('/schedule', scheduleRouter);

// Пример тестов
describe('Schedule API', () => {
    it('should get schedule', async () => {
        const response = await request(app).get('/schedule');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });
});
