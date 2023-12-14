const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { expect } = require('chai');
const groupPostRouter = require('../routes/group_posts');

const app = express();
app.use(bodyParser.json());

app.use('/group-post', groupPostRouter);

describe('Group Post API', () => {
    it('should get posts by group ID', async () => {
        const response = await request(app).get('/group-post/3');
        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
    });

    it('should create a new post', async () => {
        const postData = {
            title: 'New Post',
            user_id: '1',
            group_id: '3',
            content: 'Some content',
        };

        const response = await request(app)
            .post('/group-post')
            .send(postData);

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'Post created successfully');
    });

    it('should delete a post by user ID', async () => {
        const response = await request(app).delete('/group-post/1');

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'Post deleted successfully');
    });

});
