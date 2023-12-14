const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');

describe('User Deletion', () => {
    it('should delete a user and return success message', async () => {
        const response = await request(app)
            .delete('/delete/25');

        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message', 'User deleted successfully');
        expect(response.body).to.have.property('user');
    });

    it('should handle the case when the user is not found', async () => {
        const response = await request(app)
            .delete('/delete/456');

        expect(response.status).to.equal(404);
        expect(response.body).to.have.property('error');
    });

    it('should handle the case when no user ID is provided', async () => {
        const response = await request(app)
            .delete('/delete/');

        expect(response.status).to.equal(404);
        expect(response.body).to.not.have.property('error');
    });
});
