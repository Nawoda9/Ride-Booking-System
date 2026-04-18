const base = 'http://127.0.0.1:5000';

async function main() {
  const drv = await fetch(`${base}/drivers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'D',
      phone: '2',
      vehicleInfo: 'Sedan',
      licenseNumber: 'L1',
      availability: 'online',
    }),
  });

  const drvJson = await drv.json();
  console.log('driver', drv.status, drvJson.status);

  for (const path of ['/drivers/api-docs/', '/api-docs/']) {
    const docs = await fetch(`${base}${path}`);
    console.log('swagger', path, docs.status);
  }

  const openapi = await fetch(`${base}/drivers/openapi.json`);
  const oj = await openapi.json();
  console.log('drivers openapi paths', openapi.status, Object.keys(oj.paths || {}).length);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});