// Group Controller
const User = require('../models/User');
const bcrypt = require('bcryptjs');


const jwt = require('jsonwebtoken');


// LOGIN user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    if (user.is_suspended) {
      return res.status(403).json({ error: 'Your account has been suspended' });
    }
    
    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Return token and user info (excluding password)
    const { password: _, ...userData } = user.toObject();
    res.status(200).json({ message: 'Login successful', token, user: userData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.countTotalStudents = async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    res.status(200).json({ totalStudents });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.countTotalUsers = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.status(200).json({ totalUsers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.countSuspendedUsers = async (req, res) => {
  try {
    const totalSuspended = await User.countDocuments({ is_suspended: true });
    res.status(200).json({ totalSuspended });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.countUnsuspendedUsers = async (req, res) => {
  try {
    const totalUnsuspended = await User.countDocuments({ is_suspended: false });
    res.status(200).json({ totalUnsuspended });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




exports.suspendUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { is_suspended: true },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User suspended successfully', user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unsuspendUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { is_suspended: false },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'User not found' });

    res.json({ message: 'User unsuspended successfully', user: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



//CREATE user






//CREATE user








//CREATE
// >>>>>>> 250f513 (user/group validator)


exports.registerUser = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ full_name, email, password: hashedPassword, role });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//READ ONE user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//UPDATE user by ID
exports.updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




// get all users
//



// get all users






// get all users




// get all users


// >>>>>>> 250f513 (user/group validator)





exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get users not in a specific group
exports.getUsersNotInGroup = async (req, res) => {
  try {
    const groupId = req.query.groupId;
    if (!groupId) return res.status(400).json({ error: 'groupId is required' });
    const group = await require('../models/Group').findById(groupId);
    if (!group) return res.status(404).json({ error: 'Group not found' });
    const users = await User.find({ _id: { $nin: group.members } }).select('-password');
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user role (admin only)
exports.updateUserRole = async (req, res) => {
  try {
    // Only admin can update roles
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admin can update user roles' });
    }
    const { role } = req.body;
    if (!['student', 'teacher', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }
    const updated = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



