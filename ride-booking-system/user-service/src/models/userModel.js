const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const users = [];

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

function createUser({ email, password, name, phone }) {
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    const err = new Error('Email already registered');
    err.statusCode = 409;
    throw err;
  }
  const user = {
    id: uuidv4(),
    email: email.trim().toLowerCase(),
    passwordHash: hashPassword(password),
    name: name.trim(),
    phone: phone.trim(),
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  return toPublic(user);
}

function findByEmail(email) {
  return users.find((u) => u.email === email.trim().toLowerCase()) || null;
}

function findById(id) {
  return users.find((u) => u.id === id) || null;
}

function listUsers() {
  return users.map(toPublic);
}

function updateUser(id, updates) {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  const u = users[idx];
  if (updates.email && updates.email !== u.email) {
    if (users.some((x) => x.email === updates.email.toLowerCase() && x.id !== id)) {
      const err = new Error('Email already in use');
      err.statusCode = 409;
      throw err;
    }
    u.email = updates.email.trim().toLowerCase();
  }
  if (updates.name !== undefined) u.name = String(updates.name).trim();
  if (updates.phone !== undefined) u.phone = String(updates.phone).trim();
  if (updates.password) u.passwordHash = hashPassword(updates.password);
  return toPublic(u);
}

function deleteUser(id) {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
}

function verifyPassword(user, password) {
  return user.passwordHash === hashPassword(password);
}

function sanitize(user) {
  if (!user) return null;
  const { passwordHash, ...rest } = user;
  return rest;
}

function toPublic(user) {
  if (!user) return null;
  return {
    id: user.id,
    account: { email: user.email },
    profile: { fullName: user.name, phone: user.phone },
    meta: { createdAt: user.createdAt },
  };
}

module.exports = {
  createUser,
  findByEmail,
  findById,
  listUsers,
  updateUser,
  deleteUser,
  verifyPassword,
  sanitize,
  toPublic,
};
