const base = 'http://127.0.0.1:5000';

async function main() {

  const book = await fetch(`${base}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      pickup: 'A',
      dropoff: 'B',
      fare: 12.5,
    }),
  });
  const bookJson = await book.json();
  console.log('booking', book.status, bookJson.status, bookJson.data?.parties?.assignedDriverId);

  for (const path of ['/users/api-docs/', '/bookings/api-docs/', '/payments/api-docs/', '/api-docs/']) {
    const docs = await fetch(`${base}${path}`);
    console.log('swagger', path, docs.status);
  }
  const openapi = await fetch(`${base}/bookings/openapi.json`);
  const oj = await openapi.json();
  console.log('bookings openapi paths', openapi.status, Object.keys(oj.paths || {}).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
