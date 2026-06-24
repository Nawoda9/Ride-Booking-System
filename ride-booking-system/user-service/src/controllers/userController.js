const userModel = require('../models/userModel');
const { success, fail } = require('../utils/response');

exports.register = (req, res, next) => {
  try {
    const { email, password, name, phone } = req.body;
    const user = userModel.createUser({ email, password, name, phone });
    success(res, 201, 'User registered', user);
  } catch (e) {
    next(e);
  }
};

exports.login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = userModel.findByEmail(email);
    if (!user || !userModel.verifyPassword(user, password)) {
      return fail(res, 401, 'Invalid email or password');
    }
    const token = `demo-token-${user.id}`;
    success(res, 200, 'Login successful', {
      user: userModel.toPublic(user),
      token,
    });
  } catch (e) {
    next(e);
  }
};

exports.getAllUsers = (req, res) => {
  success(res, 200, 'Users retrieved', userModel.listUsers());
};

exports.getUserById = (req, res) => {
  const user = userModel.findById(req.params.id);
  if (!user) return fail(res, 404, 'User not found');
  success(res, 200, 'User retrieved', userModel.toPublic(user));
};

exports.updateUser = (req, res, next) => {
  try {
    const updated = userModel.updateUser(req.params.id, req.body);
    if (!updated) return fail(res, 404, 'User not found');
    success(res, 200, 'User updated', updated);
  } catch (e) {
    next(e);
  }
};

exports.deleteUser = (req, res) => {
  const ok = userModel.deleteUser(req.params.id);
  if (!ok) return fail(res, 404, 'User not found');
  success(res, 200, 'User deleted', null);
};
