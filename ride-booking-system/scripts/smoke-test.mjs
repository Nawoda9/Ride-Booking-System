const base = 'http://127.0.0.1:5000';

async function main() {
  const reg = await fetch(`${base}/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `u${Date.now()}@t.com`,
      password: 'secret12',
      name: 'U',
      phone: '1',
    }),
  });
  const regJson = await reg.json();
  console.log('register', reg.status, regJson.status);
  const userId = regJson.data.id;

  
 

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
