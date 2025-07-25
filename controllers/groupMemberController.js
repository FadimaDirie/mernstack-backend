const GroupMember = require("../models/groupMember");


// Add a new member
const Group = require('../models/Group');



exports.addGroupMember = async (req, res) => {
  try {
    const { groupId, userId, createdBy } = req.body;

    if (!groupId || !userId || !createdBy) {
      return res.status(400).json({ message: 'groupId, userId, and createdBy are required' });
    }

    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // Hubi in createdBy uu yahay abuuraha group-ka
    if (group.createdBy.toString() !== createdBy) {
      return res.status(403).json({ message: 'Only the group creator can add members' });
    }

    // Hubi in user hore member u yahay
    const alreadyMember = await GroupMember.findOne({ groupId, userId });
    if (alreadyMember) {
      return res.status(400).json({ message: 'User already a member' });
    }

    // Save in GroupMember collection
    const member = new GroupMember({ groupId, userId, joinedAt: new Date() });
    await member.save();

    // ✅ Update Group.members array
    group.members.push(userId);
    await group.save();

    res.status(201).json({ message: 'Member added successfully', member });

  } catch (error) {
    console.error('Add member error:', error);
    res.status(500).json({ error: error.message });
  }
};


// Get members by groupId
exports.getGroupMembers = async (req, res) => {
  try {
    const members = await GroupMember.find({ groupId: req.params.groupId })
      .populate("userId", "full_name email");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all members (no group filter)
exports.getAllGroupMembers = async (req, res) => {
  try {
    const members = await GroupMember.find().populate("userId", "full_name email");
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a group member by ID
exports.updateGroupMember = async (req, res) => {
  try {
    const member = await GroupMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!member) return res.status(404).json({ error: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



exports.removeGroupMember = async (req, res) => {
  try {
    const { createdBy } = req.body;

    const member = await GroupMember.findById(req.params.id);  // ← Halkan ayuu ku jabayaa haddii ID qaldan yahay

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const group = await Group.findById(member.groupId);
    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (group.createdBy.toString() !== createdBy) {
      return res.status(403).json({ message: 'Only the group creator can remove members' });
    }

    await member.deleteOne();
    res.status(200).json({ message: 'Member removed successfully' });

  } catch (error) {
    console.error("Remove error:", error);
    res.status(500).json({ error: error.message });
  }
};



// Join group (user joins as member)
exports.joinGroup = async (req, res) => {
  const { groupId } = req.params;
  const userId = req.user.id;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'Already a member' });
    }
    group.members.push(userId);
    await group.save();
    res.status(200).json({ message: 'Joined group successfully', group });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// This controller handles CRUD operations for group members in a MongoDB database using Mongoose.
// It includes functions to add, retrieve, update, and remove group members, with appropriate error handling and responses. 

// The controller uses Mongoose to interact with the GroupMember model, which defines the structure of group member documents in the database.
// The functions handle requests and responses, ensuring that the API adheres to RESTful principles.
// The controller also populates user details when retrieving group members, providing a more informative response to the client.
// The functions are designed to be used in an Express.js application, allowing for easy integration with routes and middleware.
// The controller is structured to handle asynchronous operations using async/await, making it easier to read and maintain.
// The controller is designed to be modular, allowing for easy expansion and modification in the future.    
// The controller is ready to be used in an Express.js application, providing a robust API for managing group members in a collaborative environment.
// The controller is designed to be efficient and scalable, handling large numbers of group members without performance issues.


