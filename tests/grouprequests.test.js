const request = require('supertest');
const { expect } = require('chai');
const server = require('../app');

describe('Group Requests Routes', () => {

    // Test for GET /grouprequest/:userId
    describe('GET /grouprequest/:userId', () => {
        it('should return all pending requests for owned groups', done => {
            request(server)
                .get('/grouprequest/2') // Replace '2' with an actual user ID
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    // Test for POST /grouprequest/create
    describe('POST /grouprequest/create', () => {
        it('should create a new join request', done => {
            request(server)
                .post('/grouprequest/create')
                .send({ userid: '5', groupid: '3' }) // Replace with test data
                .end((err, res) => {
                    expect(res.status).to.equal(201);
                    expect(res.body).to.have.property('message', 'Join request created successfully');
                    done();
                });
        });
    });

    // Test for DELETE /grouprequest/:userId/fromgroup/:groupId/choice/:choice
    describe('DELETE /grouprequest/:userId/fromgroup/:groupId/choice/:choice', () => {
        it('should handle the join request based on the choice', done => {
            request(server)
                .delete('/grouprequest/3/fromgroup/3/choice/1') // Replace with actual IDs and choice
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

});
