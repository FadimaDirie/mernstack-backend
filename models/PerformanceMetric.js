const mongoose = require('mongoose');

const PerformanceMetricSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
  completed_tasks: { type: Number, required: true },
  total_sessions: { type: Number, required: true },
  productivity_score: { type: Number, required: true },
  date_recorded: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('PerformanceMetric', PerformanceMetricSchema);
