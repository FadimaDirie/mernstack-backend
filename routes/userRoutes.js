// user routes.js
const express = require('express');
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  getUsersNotInGroup,
  updateUserRole
} = require('../controllers/userController');
const { registerValidator} = require('../validators/userValidator');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/authMiddleware');

router.post('/login', loginUser);

//CREATE
router.post('/register',validate(registerValidator),registerUser);

//READ
router.get('/', getAllUsers);          // Get all users
router.get('/:id', getUserById);       // Get single user by ID

// List users not in a group
router.get('/not-in-group', auth, getUsersNotInGroup);

//UPDATE
router.put('/:id', updateUser);        // Update user by ID

// Update user role (admin only)
router.put('/:id/role', auth, updateUserRole);

//DELETE
router.delete('/:id', deleteUser);     // Delete user by ID



module.exports = router;
