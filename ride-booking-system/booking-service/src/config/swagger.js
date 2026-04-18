const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Booking Service API',
      version: '1.0.0',
      description: 'Ride requests, driver assignment, and booking lifecycle.',
    },
    servers: [
      { url: 'http://localhost:3003', description: 'Direct service' },
      { url: 'http://localhost:5000/bookings', description: 'Via API Gateway' },
    ],
    components: {
      schemas: {
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            parties: {
              type: 'object',
              properties: {
                passengerUserId: { type: 'string', format: 'uuid' },
                assignedDriverId: { type: 'string', format: 'uuid' },
              },
            },
            trip: {
              type: 'object',
              properties: {
                pickup: { type: 'object', properties: { label: { type: 'string' } } },
                dropoff: { type: 'object', properties: { label: { type: 'string' } } },
              },
            },
            pricing: {
              type: 'object',
              properties: {
                fare: {
                  nullable: true,
                  type: 'object',
                  properties: {
                    amount: { type: 'number' },
                    currency: { type: 'string', example: 'LKR' },
                  },
                },
              },
            },
            lifecycle: {
              type: 'object',
              properties: {
                status: {
                  type: 'string',
                  enum: ['requested', 'accepted', 'ongoing', 'completed', 'cancelled'],
                },
              },
            },
            meta: {
              type: 'object',
              properties: {
                createdAt: { type: 'string', format: 'date-time' },
                updatedAt: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routes/bookingRoutes.js'), path.join(__dirname, 'swaggerPaths.js')],
};

module.exports = swaggerJsdoc(options);
