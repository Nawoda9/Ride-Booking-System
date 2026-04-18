const express = require('express');
const { body, param } = require('express-validator');
const paymentController = require('../controllers/paymentController');
const { validateRequest } = require('../middleware/validateRequest');
const { VALID_STATUSES } = require('../models/paymentModel');

const router = express.Router();

const createRules = [
  body('bookingId').isUUID(),
  body('amount').isFloat({ gt: 0 }),
  body('method').optional().trim().notEmpty(),
];

const statusRules = [
  param('id').isUUID(),
  body('status').isIn(VALID_STATUSES),
];

router.post('/', [...createRules, validateRequest], paymentController.createPayment);
router.get('/', paymentController.getAllPayments);
router.get(
  '/booking/:bookingId',
  [param('bookingId').isUUID(), validateRequest],
  paymentController.getPaymentsByBooking
);
router.get('/:id', [param('id').isUUID(), validateRequest], paymentController.getPaymentById);
router.patch('/:id/status', [...statusRules, validateRequest], paymentController.updatePaymentStatus);
router.delete('/:id', [param('id').isUUID(), validateRequest], paymentController.deletePayment);

module.exports = router;
