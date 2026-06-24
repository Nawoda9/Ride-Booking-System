const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PORT = process.env.PORT || 5000;
const HOST = process.env.PUBLIC_HOST || 'localhost';
const GW_BASE = `http://${HOST}:${PORT}`;

const UPSTREAMS = [
  ['/users', process.env.USER_SERVICE_URL || 'http://localhost:3001'],
  ['/drivers', process.env.DRIVER_SERVICE_URL || 'http://localhost:3002'],
  ['/bookings', process.env.BOOKING_SERVICE_URL || 'http://localhost:3003'],
  ['/payments', process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004'],
];

const SWAGGER_NAMES = {
  '/users': 'User Service',
  '/drivers': 'Driver Service',
  '/bookings': 'Booking Service',
  '/payments': 'Payment Service',
};

const swaggerViaGateway = () => ({
  combined: `${GW_BASE}/api-docs/`,
  ...Object.fromEntries(
    UPSTREAMS.map(([mount]) => [mount.slice(1), `${GW_BASE}${mount}/api-docs/`])
  ),
});

const swaggerDirect = () => ({
  users: `http://${HOST}:3001/api-docs/`,
  drivers: `http://${HOST}:3002/api-docs/`,
  bookings: `http://${HOST}:3003/api-docs/`,
  payments: `http://${HOST}:3004/api-docs/`,
});

const app = express();
app.use(cors());

app.use((req, res, next) => {
  const t = Date.now();
  res.on('finish', () => {
    console.log(`[GW] ${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - t}ms)`);
  });
  next();
});

// Trailing slash: Swagger relative assets break on /service/api-docs without /
const SERVICE_SWAGGER_EXACT = UPSTREAMS.map(([m]) => `${m}/api-docs`);
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return next();
  const bare = req.originalUrl.split('?')[0];
  if (bare === '/api-docs') {
    const q = req.originalUrl.includes('?') ? req.originalUrl.slice(req.originalUrl.indexOf('?')) : '';
    return res.redirect(302, `/api-docs/${q}`);
  }
  if (SERVICE_SWAGGER_EXACT.includes(req.path)) {
    const q = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    return res.redirect(302, `${req.path}/${q}`);
  }
  next();
});

function openapiProxy(mount, target) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathFilter: (pathname) => pathname === `${mount}/openapi.json`,
    pathRewrite: () => '/openapi.json',
  });
}

function swaggerProxy(mount, target) {
  const esc = mount.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathFilter: (pathname) => pathname.startsWith(`${mount}/api-docs`),
    pathRewrite: (path) => path.replace(new RegExp(`^${esc}/api-docs`), '/api-docs'),
  });
}

function apiProxy(mount, target) {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: (p) => {
      if (!p || p === '/') return mount;
      return mount + (p.startsWith('/') ? p : `/${p}`);
    },
  });
}

for (const [mount, target] of UPSTREAMS) {
  app.use(openapiProxy(mount, target));
}

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'API Gateway — open swaggerViaGateway URLs in a browser (use trailing / on …/api-docs/).',
    data: {
      gateway: GW_BASE,
      proxyPaths: UPSTREAMS.map(([m]) => m),
      swaggerViaGateway: swaggerViaGateway(),
      swaggerDirectToServices: swaggerDirect(),
    },
  });
});

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(null, {
    explorer: true,
    customSiteTitle: 'Ride Booking — all microservices',
    swaggerUrls: UPSTREAMS.map(([mount]) => ({
      url: `${mount}/openapi.json`,
      name: SWAGGER_NAMES[mount],
    })),
  })
);

for (const [mount, target] of UPSTREAMS) {
  app.use(swaggerProxy(mount, target));
}
for (const [mount, target] of UPSTREAMS) {
  app.use(mount, apiProxy(mount, target));
}

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Gateway: no route for ${req.method} ${req.originalUrl}`,
    data: null,
  });
});

app.listen(PORT, () => {
  console.log(`API Gateway ${GW_BASE} | Swagger: ${GW_BASE}/api-docs/`);
});
