const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Driver Service API',
      version: '1.0.0',
      description: 'Driver profiles, vehicles, and availability.',
    },
    servers: [
      { url: 'http://localhost:3002', description: 'Direct service' },
      { url: 'http://localhost:5000/drivers', description: 'Via API Gateway' },
    ],
    components: {
      schemas: {
        Driver: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            profile: {
              type: 'object',
              properties: { fullName: { type: 'string' }, phone: { type: 'string' } },
            },
            vehicle: {
              type: 'object',
              properties: {
                description: { type: 'string', nullable: true },
                licenseNumber: { type: 'string', nullable: true },
              },
            },
            availability: {
              type: 'object',
              properties: { status: { type: 'string', enum: ['online', 'offline'] } },
            },
            meta: {
              type: 'object',
              properties: { createdAt: { type: 'string', format: 'date-time' } },
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routes/driverRoutes.js'), path.join(__dirname, 'swaggerPaths.js')],
};

module.exports = swaggerJsdoc(options);
