const { v4: uuidv4 } = require('uuid');

const VALID_STATUSES = ['pending', 'paid', 'failed'];

const payments = [];

function createPayment({ bookingId, amount, method, status = 'pending' }) {
  const payment = {
    id: uuidv4(),
    bookingId,
    amount: Number(amount),
    method: String(method || 'card').trim(),
    status,
    createdAt: new Date().toISOString(),
  };
  payments.push(payment);
  return toPublic(payment);
}

function findById(id) {
  const p = payments.find((x) => x.id === id);
  return p ? { ...p } : null;
}

function listPayments() {
  return payments.map(toPublic);
}

function listByBookingId(bookingId) {
  return payments.filter((p) => p.bookingId === bookingId).map(toPublic);
}

function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    const err = new Error(`Invalid status. Allowed: ${VALID_STATUSES.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }
  const p = payments.find((x) => x.id === id);
  if (!p) return null;
  p.status = status;
  return toPublic(p);
}

function deletePayment(id) {
  const idx = payments.findIndex((x) => x.id === id);
  if (idx === -1) return false;
  payments.splice(idx, 1);
  return true;
}

function toPublic(p) {
  if (!p) return null;
  return {
    id: p.id,
    reference: { bookingId: p.bookingId },
    money: { amount: p.amount, currency: 'LKR' },
    channel: { method: p.method },
    lifecycle: { status: p.status },
    meta: { createdAt: p.createdAt },
  };
}

module.exports = {
  VALID_STATUSES,
  createPayment,
  findById,
  listPayments,
  listByBookingId,
  updateStatus,
  deletePayment,
  toPublic,
};
