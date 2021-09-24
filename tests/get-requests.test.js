const { expect } = require('chai');
const request = require('supertest');
const app = 'https://reqres.in';

describe('/users', () => {
    describe('POST', () => {
        it('creates a new user', async () => {
            const user = await request(app).post('/api/users').send({
                name: 'Goku',
                job: 'farmer',
            });
            expect(user.statusCode).to.eq(201);
            expect(user.body.name).to.eq('Goku')
        });
    });
    describe('PUT & PATCH', () => {
        it('updates a new user using PUT', async () => {
            const updatedUser = await request(app)
            .put(`/api/users/300`)
            .send({name: 'test-fred', job: 'head-chef'})
            expect(updatedUser.statusCode).to.eq(200);
            expect(updatedUser.body.name).to.eq('test-fred')
            expect(updatedUser.body.job).to.eq('head-chef')
        });
        it('updates a new user using Patch', async () => {
            const updatedUser = await request(app)
            .put(`/api/users/301`)
            .send({name: 'ken', job: 'flamethrower'})
            expect(updatedUser.statusCode).to.eq(200);
            expect(updatedUser.body.name).to.eq('ken')
            expect(updatedUser.body.job).to.eq('flamethrower')
        });
    });
    describe('GET', () => {
        it('displays all the users by page', async () => {
            const users = await request(app).get(`/api/users?page=2`)
            expect(users.statusCode).to.eq(200);
            expect(users.body.data).to.have.length.greaterThan(1)
        });
        it('displays a user by id', async () => {
            const users = await request(app).get(`/api/users/2`)
            expect(users.statusCode).to.eq(200);
            expect(users.body.data.first_name).to.eq('Janet')
        });
    });
    describe('DELETE', () => {
        it('updates a new user using PUT', async () => {
            const updatedUser= await request(app)
            .delete(`/api/users/300`)
            const deletedUser = await request(app)
            .get(`/api/users/300`)
            expect(updatedUser.statusCode).to.eq(204);
            expect(deletedUser.body).to.be.empty
        });
    });
});