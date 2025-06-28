const PerformanceMetric = require('../models/PerformanceMetric');
const User = require('../models/User');
const Group = require('../models/Group');
const Task = require('../models/Task');
// const CalendarEvent = require('../models/CalendarEvent');

// CREATE
exports.createMetric = async (req, res) => {
  try {
    const metric = new PerformanceMetric({
      user_id: req.body.user_id,
      group_id: req.body.group_id,
      completed_tasks: req.body.completed_tasks,
      total_sessions: req.body.total_sessions,
      productivity_score: req.body.productivity_score,
      date_recorded: req.body.date_recorded
    });

    await metric.save();
    res.status(201).json(metric);
  } catch (err) {
    console.error('Save error:', err);
    res.status(500).json({ error: err.message });
  }
};

// READ – Get metrics for one user
exports.getUserMetrics = async (req, res) => {
  try {
    const metrics = await PerformanceMetric.find({ user_id: req.params.user_id });
    res.json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateMetric = async (req, res) => {
  try {
    const metric = await PerformanceMetric.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!metric) return res.status(404).json({ msg: 'Metric not found' });
    res.json(metric);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteMetric = async (req, res) => {
  try {
    const result = await PerformanceMetric.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ msg: 'Metric not found' });
    res.json({ msg: 'Performance deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Dashboard Summary
exports.getDashboardSummary = async (req, res) => {
  try {
    const [totalStudents, activeGroups, tasksCompleted, upcomingEvents] = await Promise.all([
      User.countDocuments({ role: 'student' }),
      Group.countDocuments(),
      Task.countDocuments({ status: 'completed' }),
      CalendarEvent.countDocuments({ start: { $gt: new Date() } })
    ]);
    res.json({
      totalStudents,
      activeGroups,
      tasksCompleted,
      upcomingEvents
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
