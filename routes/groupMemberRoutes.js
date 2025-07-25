// routes/groupMemberRoutes.js
const express = require('express');


// routes/groupMemberRoutes.js
const authenticate = require('../middlewares/authenticate');

const router = express.Router();


// GET all group members (dummy response)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Group members endpoint working ✅' });
});




const {
  addGroupMember,
  getGroupMembers,
  getAllGroupMembers,
  updateGroupMember,
  removeGroupMember,
  joinGroup
} = require("../controllers/groupMemberController");
  





// GET all group members (dummy response)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Group members endpoint working ✅' });
});


// Add a new member to a group
router.post('/add-member',  addGroupMember);
router.delete('/:id', removeGroupMember);


router.post('/:groupId/join', authenticate, joinGroup);

// Get all members of a specific group by groupId
router.get("/:groupId", getGroupMembers);

// Get all group members
router.get("/", getAllGroupMembers);

// Update a group member by ID
router.put("/:id", updateGroupMember);

// Remove a group member by ID



// Placeholder route
router.get('/', (req, res) => {
  res.send('Group members route is working');
});



module.exports = router;
