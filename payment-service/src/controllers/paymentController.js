const paymentModel = require('../models/paymentModel');
const { bookingExists } = require('../services/integrationClient');
const { success, fail } = require('../utils/response');

exports.createPayment = async (req, res, next) => {
  try {
    const { bookingId, amount, method } = req.body;
    const exists = await bookingExists(bookingId);
    if (!exists) {
      return fail(res, 400, 'Booking does not exist or booking service unreachable');
    }
    const payment = paymentModel.createPayment({ bookingId, amount, method, status: 'pending' });
    success(res, 201, 'Payment created', payment);
  } catch (e) {
    next(e);
  }
};

exports.getAllPayments = (req, res) => {
  success(res, 200, 'Payments retrieved', paymentModel.listPayments());
};

exports.getPaymentById = (req, res) => {
  const p = paymentModel.findById(req.params.id);
  if (!p) return fail(res, 404, 'Payment not found');
  success(res, 200, 'Payment retrieved', paymentModel.toPublic(p));
};

exports.getPaymentsByBooking = (req, res) => {
  const list = paymentModel.listByBookingId(req.params.bookingId);
  success(res, 200, 'Payments for booking retrieved', list);
};

exports.updatePaymentStatus = (req, res, next) => {
  try {
    const { status } = req.body;
    const updated = paymentModel.updateStatus(req.params.id, status);
    if (!updated) return fail(res, 404, 'Payment not found');
    success(res, 200, 'Payment status updated', updated);
  } catch (e) {
    next(e);
  }
};

exports.deletePayment = (req, res) => {
  const ok = paymentModel.deletePayment(req.params.id);
  if (!ok) return fail(res, 404, 'Payment not found');
  success(res, 200, 'Payment deleted', null);
};
