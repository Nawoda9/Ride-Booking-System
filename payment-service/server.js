const app = require('./src/app');

const PORT = process.env.PORT || 3004;
const HOST = process.env.PUBLIC_HOST || 'localhost';
const BASE = `http://${HOST}:${PORT}`;

app.listen(PORT, () => {
  console.log(`[PS] Payment service listening on ${BASE}`);
  console.log(`[PS] Swagger UI: ${BASE}/api-docs/`);
});
