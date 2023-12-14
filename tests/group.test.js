const request = require('supertest');
const express = require('express');
const expect = require('chai').expect;
const app = express();

const groupRouter = require('../routes/groups');
app.use('/groups', groupRouter);

describe('Group API', () => {
    it('should get a list of all groups', async () => {
        const response = await request(app).get('/groups/allgroups');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('should get details of a group by ID', async () => {
        const response = await request(app).get('/groups/1');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('object');
    });

    it('should get a list of group members by group ID', async () => {
        const response = await request(app).get('/groups/members/2'); // group id
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array'); // response should be an array
    });

    it('should add a new group', (done) => {
        const newGroup = {
            name: 'New Group',
            description: 'Description of the new group',
            avatar_url: 'group_avatar_url',
            owner_id: 1,
        };

        request(app)
            .post('/groups/add')
            .send(newGroup)
            .end((err, res) => {
                expect(res.status).to.equal(201);
                expect(res.body).to.be.an('object');
            });
        done();
    });




    it('should delete a group by ID', async () => {
        // group id
        const response = await request(app).delete('/groups/delete/1');// group id
        expect(response.status).to.equal(202);
        expect(response.body).to.be.an('object'); //delete group
    });
});
