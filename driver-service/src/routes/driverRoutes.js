const express = require('express');
const { body, param } = require('express-validator');
const driverController = require('../controllers/driverController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

const createRules = [
  body('name').trim().notEmpty(),
  body('phone').trim().notEmpty(),
  body('vehicleInfo').optional().trim(),
  body('licenseNumber').optional().trim(),
  body('availability').optional().isIn(['online', 'offline']),
];

const updateRules = [
  param('id').isUUID(),
  body('name').optional().trim().notEmpty(),
  body('phone').optional().trim().notEmpty(),
  body('vehicleInfo').optional().trim(),
  body('licenseNumber').optional().trim(),
  body('availability').optional().isIn(['online', 'offline']),
];

const availabilityRules = [
  param('id').isUUID(),
  body('availability').isIn(['online', 'offline']),
];

router.post('/', [...createRules, validateRequest], driverController.createDriver);
router.get('/', driverController.getAllDrivers);
router.get('/:id', [param('id').isUUID(), validateRequest], driverController.getDriverById);
router.put('/:id', [...updateRules, validateRequest], driverController.updateDriver);
router.patch(
  '/:id/availability',
  [...availabilityRules, validateRequest],
  driverController.updateAvailability
);
router.delete('/:id', [param('id').isUUID(), validateRequest], driverController.deleteDriver);

module.exports = router;
