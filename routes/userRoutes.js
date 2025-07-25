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
  updateUserRole,
  countTotalUsers,
  countTotalStudents,
  countSuspendedUsers,
  countUnsuspendedUsers,
  suspendUser,
  unsuspendUser
} = require('../controllers/userController');

const { registerValidator } = require('../validators/userValidator');
const validate = require('../middlewares/validate');
const auth = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// 🔐 Auth-free routes
router.post('/login', loginUser);
router.post('/register', validate(registerValidator), registerUser);

// 📊 Stats route (admin only)
router.get('/stats', auth, isAdmin, getUserStats);

// 📥 Read operations
router.get('/', auth, getAllUsers);              // All users (with token)
router.get('/:id', auth, getUserById);           // Single user by ID
router.get('/not-in-group', auth, getUsersNotInGroup); // Users not in group

// 📤 Update operations
router.put('/:id', auth, updateUser);            // Update user info
router.put('/:id/role', auth, isAdmin, updateUserRole); // Admin: update role
router.get('/count/total-users', auth, isAdmin, countTotalUsers);
router.get('/count/students', auth, isAdmin, countTotalStudents);
router.get('/count/suspended', auth, isAdmin, countSuspendedUsers);
router.get('/count/unsuspended', auth, isAdmin, countUnsuspendedUsers);

router.get('/count/total-users', auth, isAdmin, countTotalUsers);
router.get('/count/students', auth, isAdmin, countTotalStudents);
router.get('/count/suspended', auth, isAdmin, countSuspendedUsers);
router.get('/count/unsuspended', auth, isAdmin, countUnsuspendedUsers);

router.put('/:id/suspend', auth, isAdmin, suspendUser);
router.put('/:id/unsuspend', auth, isAdmin, unsuspendUser);
// ❌ Delete
router.delete('/:id', auth, isAdmin, deleteUser); // Admin: delete user

// 🔎 Filters
router.get('/filter/active', auth, isAdmin, getActiveUsers);     // List active users
router.get('/filter/inactive', auth, isAdmin, getInactiveUsers); // List inactive users

module.exports = router;
