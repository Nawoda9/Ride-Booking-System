const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'User Service API',
      version: '1.0.0',
      description: 'Passenger registration, authentication, and profile management.',
    },
    servers: [
      { url: 'http://localhost:3001', description: 'Direct service' },
      { url: 'http://localhost:5000/users', description: 'Via API Gateway' },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            account: {
              type: 'object',
              properties: { email: { type: 'string', format: 'email' } },
            },
            profile: {
              type: 'object',
              properties: {
                fullName: { type: 'string' },
                phone: { type: 'string' },
              },
            },
            meta: {
              type: 'object',
              properties: { createdAt: { type: 'string', format: 'date-time' } },
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', enum: ['success', 'error'] },
            message: { type: 'string' },
            data: { nullable: true },
          },
        },
      },
    },
  },
  apis: [
    path.join(__dirname, '../routes/userRoutes.js'),
    path.join(__dirname, 'swaggerPaths.js'),
  ],
};

module.exports = swaggerJsdoc(options);
