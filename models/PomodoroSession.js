// PomodoroSession.js
const mongoose = require('mongoose');

const PomodoroSessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  duration_minutes: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PomodoroSession', PomodoroSessionSchema);
