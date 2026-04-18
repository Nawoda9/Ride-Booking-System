const express = require('express');
const { body, param } = require('express-validator');
const bookingController = require('../controllers/bookingController');
const { validateRequest } = require('../middleware/validateRequest');
const { VALID_STATUSES } = require('../models/bookingModel');

const router = express.Router();

const createRules = [
  body('userId').isUUID(),
  body('pickup').trim().notEmpty(),
  body('dropoff').trim().notEmpty(),
  body('fare').optional().isFloat({ min: 0 }),
  body('driverId').optional().isUUID(),
];

const statusRules = [
  param('id').isUUID(),
  body('status').isIn(VALID_STATUSES),
];

router.post('/', [...createRules, validateRequest], bookingController.createBooking);
router.get('/', bookingController.getAllBookings);
router.get('/user/:userId', [param('userId').isUUID(), validateRequest], bookingController.getBookingsByUser);
router.get(
  '/driver/:driverId',
  [param('driverId').isUUID(), validateRequest],
  bookingController.getBookingsByDriver
);
router.get('/:id', [param('id').isUUID(), validateRequest], bookingController.getBookingById);
router.patch('/:id/status', [...statusRules, validateRequest], bookingController.updateBookingStatus);
router.delete('/:id', [param('id').isUUID(), validateRequest], bookingController.deleteBooking);

module.exports = router;
