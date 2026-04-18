const base = 'http://127.0.0.1:5000';

async function main() {

  const pay = await fetch(`${base}/payments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bookingId: bookJson.data.id,
      amount: 12.5,
      method: 'card',
    }),
  });
  const payJson = await pay.json();
  console.log('payment', pay.status, payJson.status);

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
