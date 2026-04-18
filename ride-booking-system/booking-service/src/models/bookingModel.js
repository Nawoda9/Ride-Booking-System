const { v4: uuidv4 } = require('uuid');

const VALID_STATUSES = ['requested', 'accepted', 'ongoing', 'completed', 'cancelled'];

const bookings = [];

function createBooking({ userId, driverId, pickup, dropoff, fare, status = 'requested' }) {
  const booking = {
    id: uuidv4(),
    userId,
    driverId,
    pickup: String(pickup).trim(),
    dropoff: String(dropoff).trim(),
    fare: fare != null ? Number(fare) : null,
    status,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  bookings.push(booking);
  return toPublic(booking);
}

function findById(id) {
  const b = bookings.find((x) => x.id === id);
  return b ? { ...b } : null;
}

function listBookings() {
  return bookings.map(toPublic);
}

function listByUserId(userId) {
  return bookings.filter((b) => b.userId === userId).map(toPublic);
}

function listByDriverId(driverId) {
  return bookings.filter((b) => b.driverId === driverId).map(toPublic);
}

function updateStatus(id, status) {
  if (!VALID_STATUSES.includes(status)) {
    const err = new Error(`Invalid status. Allowed: ${VALID_STATUSES.join(', ')}`);
    err.statusCode = 400;
    throw err;
  }
  const b = bookings.find((x) => x.id === id);
  if (!b) return null;
  b.status = status;
  b.updatedAt = new Date().toISOString();
  return toPublic(b);
}

function deleteBooking(id) {
  const idx = bookings.findIndex((x) => x.id === id);
  if (idx === -1) return false;
  bookings.splice(idx, 1);
  return true;
}

function toPublic(b) {
  if (!b) return null;
  return {
    id: b.id,
    parties: { passengerUserId: b.userId, assignedDriverId: b.driverId },
    trip: {
      pickup: { label: b.pickup },
      dropoff: { label: b.dropoff },
    },
    pricing: {
      fare:
        b.fare != null && !Number.isNaN(b.fare)
          ? { amount: b.fare, currency: 'LKR' }
          : null,
    },
    lifecycle: { status: b.status },
    meta: { createdAt: b.createdAt, updatedAt: b.updatedAt },
  };
}

module.exports = {
  VALID_STATUSES,
  createBooking,
  findById,
  listBookings,
  listByUserId,
  listByDriverId,
  updateStatus,
  deleteBooking,
  toPublic,
};
