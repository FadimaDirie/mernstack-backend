const Group = require('../models/Group');


const createGroup = async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;

    const newGroup = new Group({
      name,
      description,
      createdBy,
      members: [createdBy] // creator becomes the first member
    });

    await newGroup.save();
    res.status(201).json({ message: 'Group created successfully', group: newGroup });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const GroupMember = require('../models/groupMember');

const joinGroup = async (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body; // ✅ userId ka hel body-ga

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    // Hubi in group-ka jiro
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });

    // Haddii hore ugu jiro
    if (group.members.includes(userId)) {
      return res.status(400).json({ message: 'Already a member of this group' });
    }

    // Ku dar user-ka
    group.members.push(userId);
    await group.save();

    // Save in GroupMember table
    const newMember = new GroupMember({
      groupId: groupId,
      userId: userId,
      joinedAt: new Date()
    });

    await newMember.save();

    res.status(200).json({
      message: 'User joined group successfully',
      group
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




const getAllGroups = async (req, res) => {
  try {
    const groups = await Group.find()
      .populate('createdBy', 'full_name email')
      .populate('members', 'full_name email');
    res.json(groups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ ONE GROUP

const getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate('createdBy', 'full_name email')
      .populate('members', 'full_name email');
    if (!group) return res.status(404).json({ error: 'Group not found' });
    res.json(group);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// UPDATE GROU
//UPDATE

const updateGroup = async (req, res) => {
  try {
    const updated = await Group.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'Group not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


// DELETE GROUP

// DELETE

const deleteGroup = async (req, res) => {
  try {
    const deleted = await Group.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Group not found' });
    res.json({ message: 'Group deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  createGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
  joinGroup
};



