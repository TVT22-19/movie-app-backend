const request = require('supertest');
const { expect } = require('chai');
const server = require('../app');

describe('Login Route', () => {

    describe('POST /auth', () => {
        it('should return error for invalid credentials', done => {
            request(server)
                .post('/auth') // Adjust the path if your route is different
                .send({ username: 'invalidUser', password: 'wrongPassword' })
                .end((err, res) => {
                    expect(res.status).to.equal(401);
                    expect(res.body).to.have.property('error', 'Invalid username or password');
                    done();
                });
        });

        it('should successfully login with correct credentials', done => {
            // You need to replace these credentials with valid ones for your test database
            request(server)
                .post('/auth')
                .send({ username: 'testUser', password: 'testPassword' })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.have.property('message', 'Login successful');
                    expect(res.body).to.have.property('token');
                    done();
                });
        });
    });

});
