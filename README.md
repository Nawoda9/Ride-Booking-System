# MTIT_microservices — Ride Booking (final delivery)

**Node.js 18+** | **4 microservices** + **API Gateway** | **Swagger** | **In-memory data**

Full documentation: **[ride-booking-system/README.md](ride-booking-system/README.md)**

---

## Submit / deliver (checklist)

1. **Clone or zip** this repository (recommended: exclude `node_modules` — use `.gitignore`; recipient runs `npm run install:all`).
2. **Install:** from repo root run `npm run install:all` (installs root tools + every service + gateway).
3. **Run:** `npm start` (frees ports 3001–3004 & 5000, then starts all five processes).
4. **Verify:** with everything running, `npm run smoke` — expect `register` / `driver` / `booking` / `payment` **success** and Swagger **200** lines.
5. **Demo:** open **http://localhost:5000/api-docs/** (combined Swagger) or per-service URLs in the doc above.

---

## Quick commands (repo root)

| Command | Purpose |
|--------|---------|
| `npm run install:all` | Install all dependencies |
| `npm start` | Run User, Driver, Booking, Payment + Gateway together |
| `npm run smoke` | Quick API smoke test (needs `npm start` already running) |
| `npm run ports:free` | Kill processes on 3001–3004, 5000 if ports stuck |
| `npm run start:user` … `start:gateway` | Run one service only |

**EADDRINUSE:** `prestart` clears default ports before `npm start`. If it persists, close other terminals using those ports or run `npm run ports:free`.

---

## Repository layout

```text
MTIT_microservices/
├── package.json              # Root: concurrently, kill-port, start/smoke scripts
├── scripts/free-ports.js
├── README.md                 # This file
└── ride-booking-system/
    ├── README.md             # Architecture, Swagger URLs, demo flow, env vars
    ├── scripts/smoke-test.mjs
    ├── user-service/
    ├── driver-service/
    ├── booking-service/
    ├── payment-service/
    └── api-gateway/