const driverModel = require('../models/driverModel');
const { success, fail } = require('../utils/response');

exports.createDriver = (req, res, next) => {
  try {
    const driver = driverModel.createDriver(req.body);
    success(res, 201, 'Driver created', driver);
  } catch (e) {
    next(e);
  }
};

exports.getAllDrivers = (req, res) => {
  success(res, 200, 'Drivers retrieved', driverModel.listDrivers());
};

exports.getDriverById = (req, res) => {
  const driver = driverModel.findById(req.params.id);
  if (!driver) return fail(res, 404, 'Driver not found');
  success(res, 200, 'Driver retrieved', driverModel.toPublic(driver));
};

exports.updateDriver = (req, res) => {
  const updated = driverModel.updateDriver(req.params.id, req.body);
  if (!updated) return fail(res, 404, 'Driver not found');
  success(res, 200, 'Driver updated', updated);
};

exports.updateAvailability = (req, res) => {
  const { availability } = req.body;
  const updated = driverModel.setAvailability(req.params.id, availability);
  if (!updated) return fail(res, 404, 'Driver not found');
  success(res, 200, 'Availability updated', updated);
};

exports.deleteDriver = (req, res) => {
  const ok = driverModel.deleteDriver(req.params.id);
  if (!ok) return fail(res, 404, 'Driver not found');
  success(res, 200, 'Driver deleted', null);
};
