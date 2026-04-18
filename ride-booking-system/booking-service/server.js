const app = require('./src/app');

const PORT = process.env.PORT || 3003;
const HOST = process.env.PUBLIC_HOST || 'localhost';
const BASE = `http://${HOST}:${PORT}`;

app.listen(PORT, () => {
  console.log(`[BS] Booking service listening on ${BASE}`);
  console.log(`[BS] Swagger UI: ${BASE}/api-docs/`);
});
