const express = require('express');
const { body, param } = require('express-validator');
const userController = require('../controllers/userController');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

const registerRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 characters'),
  body('name').trim().notEmpty(),
  body('phone').trim().notEmpty(),
];

const loginRules = [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

const updateRules = [
  param('id').isUUID(),
  body('email').optional().isEmail().normalizeEmail(),
  body('password').optional().isLength({ min: 6 }),
  body('name').optional().trim().notEmpty(),
  body('phone').optional().trim().notEmpty(),
];

router.post('/register', [...registerRules, validateRequest], userController.register);
router.post('/login', [...loginRules, validateRequest], userController.login);
router.get('/', userController.getAllUsers);
router.get('/:id', [param('id').isUUID(), validateRequest], userController.getUserById);
router.put('/:id', [...updateRules, validateRequest], userController.updateUser);
router.delete('/:id', [param('id').isUUID(), validateRequest], userController.deleteUser);

module.exports = router;
