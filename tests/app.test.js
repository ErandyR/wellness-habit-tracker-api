require('dotenv').config();

const request = require('supertest');
const app = require('../app');


describe('API Tests', () => {

    test('GET / should return API running message', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            'Wellness Habit Tracker API is running!'
        );
    });
});

test('GET /habits should require authentication', async () => {
    const response = await request(app).get('/habits');

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe(
        'Authentication required.'
    );
});

