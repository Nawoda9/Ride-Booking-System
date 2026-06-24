const app = require('./src/app');

const PORT = process.env.PORT || 3001;
const HOST = process.env.PUBLIC_HOST || 'localhost';
const BASE = `http://${HOST}:${PORT}`;

app.listen(PORT, () => {
  console.log(`[US] User service listening on ${BASE}`);
  console.log(`[US] Swagger UI: ${BASE}/api-docs/`);
});
