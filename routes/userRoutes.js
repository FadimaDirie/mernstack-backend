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



// 📥 Read operations
router.get('/', getAllUsers);              // All users (with token)
router.get('/:id', getUserById);           // Single user by ID
router.get('/not-in-group', getUsersNotInGroup); // Users not in group

// 📤 Update operations
router.put('/:id', updateUser);            // Update user info
router.put('/:id/role', isAdmin, updateUserRole); // Admin: update role


router.get('/count/total-users', isAdmin, countTotalUsers);
router.get('/count/students', isAdmin, countTotalStudents);
router.get('/count/suspended', isAdmin, countSuspendedUsers);
router.get('/count/unsuspended', isAdmin, countUnsuspendedUsers);

router.put('/:id/suspend', isAdmin, suspendUser);
router.put('/:id/unsuspend', isAdmin, unsuspendUser);
// ❌ Delete
router.delete('/:id', isAdmin, deleteUser); // Admin: delete user



module.exports = router;
