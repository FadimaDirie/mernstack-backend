const express = require('express');
const router = express.Router();
const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  addMember,

  removeMember,
  isGroupAdmin,
  joinGroup
} = require('../controllers/groupController');
const auth = require('../middlewares/authMiddleware');
 // ✅ import sax ah

router.post('/:groupId/join', auth, joinGroup); // ✅ function sax ah

router.post('/create', createGroup);
router.get('/', getAllGroups);
router.get('/:id', getGroupById);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);





// Add member (admin only)
router.put('/:groupId/add-member', auth, isGroupAdmin, addMember);

// Remove member (admin only)

router.delete('/:groupId/remove-member/:userId', auth, isGroupAdmin, removeMember);

// Edit group (admin only)
router.put('/:id', auth, isGroupAdmin, updateGroup);

module.exports = router;
