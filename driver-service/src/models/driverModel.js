const { v4: uuidv4 } = require('uuid');

const drivers = [];

function createDriver(payload) {
  const driver = {
    id: uuidv4(),
    name: String(payload.name).trim(),
    phone: String(payload.phone).trim(),
    vehicleInfo: String(payload.vehicleInfo || '').trim(),
    licenseNumber: String(payload.licenseNumber || '').trim(),
    availability: payload.availability === 'online' ? 'online' : 'offline',
    createdAt: new Date().toISOString(),
  };
  drivers.push(driver);
  return toPublic(driver);
}

function findById(id) {
  return drivers.find((d) => d.id === id) || null;
}

function listDrivers() {
  return drivers.map(toPublic);
}

function updateDriver(id, updates) {
  const d = findById(id);
  if (!d) return null;
  if (updates.name !== undefined) d.name = String(updates.name).trim();
  if (updates.phone !== undefined) d.phone = String(updates.phone).trim();
  if (updates.vehicleInfo !== undefined) d.vehicleInfo = String(updates.vehicleInfo).trim();
  if (updates.licenseNumber !== undefined) d.licenseNumber = String(updates.licenseNumber).trim();
  if (updates.availability !== undefined) {
    d.availability = updates.availability === 'online' ? 'online' : 'offline';
  }
  return toPublic(d);
}

function setAvailability(id, availability) {
  const d = findById(id);
  if (!d) return null;
  d.availability = availability === 'online' ? 'online' : 'offline';
  return toPublic(d);
}

function deleteDriver(id) {
  const idx = drivers.findIndex((d) => d.id === id);
  if (idx === -1) return false;
  drivers.splice(idx, 1);
  return true;
}

function findFirstOnline() {
  return drivers.find((d) => d.availability === 'online') || null;
}

function toPublic(d) {
  if (!d) return null;
  return {
    id: d.id,
    profile: { fullName: d.name, phone: d.phone },
    vehicle: {
      description: d.vehicleInfo || null,
      licenseNumber: d.licenseNumber || null,
    },
    availability: { status: d.availability },
    meta: { createdAt: d.createdAt },
  };
}

module.exports = {
  createDriver,
  findById,
  listDrivers,
  updateDriver,
  setAvailability,
  deleteDriver,
  findFirstOnline,
  toPublic,
};
