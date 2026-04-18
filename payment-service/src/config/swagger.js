const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Payment Service API',
      version: '1.0.0',
      description: 'Payments linked to bookings (demo in-memory ledger).',
    },
    servers: [
      { url: 'http://localhost:3004', description: 'Direct service' },
      { url: 'http://localhost:5000/payments', description: 'Via API Gateway' },
    ],
    components: {
      schemas: {
        Payment: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            reference: {
              type: 'object',
              properties: { bookingId: { type: 'string', format: 'uuid' } },
            },
            money: {
              type: 'object',
              properties: {
                amount: { type: 'number' },
                currency: { type: 'string', example: 'LKR' },
              },
            },
            channel: { type: 'object', properties: { method: { type: 'string' } } },
            lifecycle: {
              type: 'object',
              properties: { status: { type: 'string', enum: ['pending', 'paid', 'failed'] } },
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
  apis: [path.join(__dirname, '../routes/paymentRoutes.js'), path.join(__dirname, 'swaggerPaths.js')],
};

module.exports = swaggerJsdoc(options);
