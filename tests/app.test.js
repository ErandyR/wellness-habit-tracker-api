require('dotenv').config();

const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');
const { connectDB, closeDB } = require('../db/connect');

let token;

beforeAll(async () => {
    await connectDB();

    token = jwt.sign(
        { testUser: 'jest-test-user' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
});

afterAll(async () => {
    await closeDB();
});

describe('API Tests', () => {

    test('GET / should return API running message', async () => {
        const response = await request(app).get('/');

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(
            'Wellness Habit Tracker API is running!'
        );
    });

    test('GET /habits should require authentication', async () => {
        const response = await request(app).get('/habits');

        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe(
            'Authentication required.'
        );
    });

    test('GET /progress should return all progress records', async () => {
        const response = await request(app)
            .get('/progress')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /journal should return all journal entries', async () => {
        const response = await request(app)
            .get('/journal')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /users should return all users', async () => {
        const response = await request(app)
            .get('/users')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    test('GET /habits should return all habits with valid JWT', async () => {
        const response = await request(app)
            .get('/habits')
            .set('Authorization', `Bearer ${token}`);

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

});