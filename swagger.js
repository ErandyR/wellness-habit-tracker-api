const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Wellness Habit Tracker API',
        description: 'API for managing users and wellness habits.',
        version: '1.0.0'
    },
    host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:3000',
    basePath: '/',
    schemes: [process.env.RENDER_EXTERNAL_HOSTNAME ? 'https' : 'http'],

    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
            description: 'Enter your JWT token using the format: Bearer YOUR_TOKEN'
        }
    },

    tags: [
        {
            name: 'Users',
            description: 'User management endpoints'
        },
        {
            name: 'Habits',
            description: 'Habit management endpoints'
        },
        {
            name: 'Progress',
            description: 'Habit progress management endpoints'
        },
        {
            name: 'Journal',
            description: 'Wellness journal management endpoints'
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);