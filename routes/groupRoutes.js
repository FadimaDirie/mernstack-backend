const express = require('express');
const router = express.Router();
const {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
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








module.exports = router;
