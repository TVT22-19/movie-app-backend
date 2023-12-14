const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
    it('should get a list of users', async () => {
        const response = await request(app).get('/users');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array').that.is.not.empty;
    });

    it('should get a user by ID', async () => {
        const userId = 4;

        const response = await request(app).get(`/users/${userId}`);

        expect(response.status).to.equal(200);
    });

});
