const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';
const DRIVER_SERVICE_URL = process.env.DRIVER_SERVICE_URL || 'http://localhost:3002';

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, body };
}

async function userExists(userId) {
  const { ok, body } = await fetchJson(`${USER_SERVICE_URL}/users/${userId}`);
  return ok && body.status === 'success';
}

async function listDrivers() {
  const { ok, body } = await fetchJson(`${DRIVER_SERVICE_URL}/drivers`);
  if (!ok || body.status !== 'success' || !Array.isArray(body.data)) return [];
  return body.data;
}

const MOCK_DRIVER_ID = 'aaaaaaaa-bbbb-4ccc-dddd-eeeeeeeeeeee';

async function assignDriver() {
  try {
    const drivers = await listDrivers();
    const online = drivers.find((d) => d.availability?.status === 'online');
    if (online) {
      console.log('[BS] Assigned driver', online.id);
      return online.id;
    }
    console.log('[BS] No online driver; mock id');
    return MOCK_DRIVER_ID;
  } catch (e) {
    console.warn('[BS] assignDriver:', e.message);
    return MOCK_DRIVER_ID;
  }
}

module.exports = {
  userExists,
  assignDriver,
  MOCK_DRIVER_ID,
};
