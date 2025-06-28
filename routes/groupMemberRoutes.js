// routes/groupMemberRoutes.js
const express = require('express');


// routes/groupMemberRoutes.js

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
const auth = require('../middlewares/authMiddleware');





// GET all group members (dummy response)
router.get('/', (req, res) => {
  res.status(200).json({ message: 'Group members endpoint working ✅' });
});


// Add a new member to a group
router.post("/", addGroupMember);

router.post('/:groupId/join', joinGroup);

// Get all members of a specific group by groupId
router.get("/:groupId", getGroupMembers);

// Get all group members
router.get("/", getAllGroupMembers);

// Update a group member by ID
router.put("/:id", updateGroupMember);

// Remove a group member by ID
router.delete("/:id", removeGroupMember);


// Placeholder route
router.get('/', (req, res) => {
  res.send('Group members route is working');
});



module.exports = router;
