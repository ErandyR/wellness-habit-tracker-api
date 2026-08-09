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
    tags: [
        {
            name: 'Users',
            description: 'User management endpoints'
        },
        {
            name: 'Habits',
            description: 'Habit management endpoints'
        }
    ]
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);