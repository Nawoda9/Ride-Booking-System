const BOOKING_SERVICE_URL = process.env.BOOKING_SERVICE_URL || 'http://localhost:3003';

async function bookingExists(bookingId) {
  const res = await fetch(`${BOOKING_SERVICE_URL}/bookings/${bookingId}`, {
    headers: { Accept: 'application/json' },
  });
  const body = await res.json().catch(() => ({}));
  return res.ok && body.status === 'success';
}

module.exports = { bookingExists };
