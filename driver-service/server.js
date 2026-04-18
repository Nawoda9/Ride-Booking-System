const app = require('./src/app');

const PORT = process.env.PORT || 3002;
const HOST = process.env.PUBLIC_HOST || 'localhost';
const BASE = `http://${HOST}:${PORT}`;

app.listen(PORT, () => {
  console.log(`[DS] Driver service listening on ${BASE}`);
  console.log(`[DS] Swagger UI: ${BASE}/api-docs/`);
});
