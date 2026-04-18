const bookingModel = require('../models/bookingModel');
const { userExists, assignDriver } = require('../services/integrationClient');
const { success, fail } = require('../utils/response');

exports.createBooking = async (req, res, next) => {
  try {
    const { userId, pickup, dropoff, fare, driverId: clientDriverId } = req.body;

    const exists = await userExists(userId);
    if (!exists) {
      return fail(res, 400, 'User does not exist or user service unreachable');
    }

    let driverId = clientDriverId;
    if (!driverId) {
      driverId = await assignDriver();
    }

    const booking = bookingModel.createBooking({
      userId,
      driverId,
      pickup,
      dropoff,
      fare,
      status: 'requested',
    });
    success(res, 201, 'Booking created; driver assigned', booking);
  } catch (e) {
    next(e);
  }
};

exports.getAllBookings = (req, res) => {
  success(res, 200, 'Bookings retrieved', bookingModel.listBookings());
};

exports.getBookingById = (req, res) => {
  const b = bookingModel.findById(req.params.id);
  if (!b) return fail(res, 404, 'Booking not found');
  success(res, 200, 'Booking retrieved', bookingModel.toPublic(b));
};

exports.getBookingsByUser = (req, res) => {
  const list = bookingModel.listByUserId(req.params.userId);
  success(res, 200, 'Bookings for user retrieved', list);
};

exports.getBookingsByDriver = (req, res) => {
  const list = bookingModel.listByDriverId(req.params.driverId);
  success(res, 200, 'Bookings for driver retrieved', list);
};

exports.updateBookingStatus = (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = bookingModel.updateStatus(req.params.id, status);
    if (!updated) return fail(res, 404, 'Booking not found');
    success(res, 200, 'Booking status updated', updated);
  } catch (e) {
    next(e);
  }
};

exports.deleteBooking = (req, res) => {
  const ok = bookingModel.deleteBooking(req.params.id);
  if (!ok) return fail(res, 404, 'Booking not found');
  success(res, 200, 'Booking deleted', null);
};
