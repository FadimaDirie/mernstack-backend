const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  is_suspended: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});


module.exports = mongoose.model('User', userSchema);
