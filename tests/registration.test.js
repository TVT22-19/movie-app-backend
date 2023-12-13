const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('User Registration', () => {
    const testUser = { username: 'testUser', password: 'testPassword' };

    it('should create a new user and return success message', async () => {
        const response = await request(app)
            .post('/registration')
            .send(testUser);

        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message', 'User created successfully');
        expect(response.body).to.have.property('user');
    });

    it('should handle the case when username already exists', async () => {
        const response = await request(app)
            .post('/registration')
            .send(testUser);

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Username already exists');
    });

    it('should handle the case when username or password is missing', async () => {
        const response = await request(app)
            .post('/registration')
            .send({ password: 'testPassword' });

        expect(response.status).to.equal(400);
        expect(response.body).to.have.property('error', 'Username and password are required');
    });
});
