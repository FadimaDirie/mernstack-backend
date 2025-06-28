const PomodoroSession = require('../models/PomodoroSession');

// CREATE
exports.createSession = async (req, res) => {
  try {
    const session = new PomodoroSession(req.body);
    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// READ – Get all sessions for one user
exports.getUserSessions = async (req, res) => {
  try {
    const sessions = await PomodoroSession.find({ user_id: req.params.user_id });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateSession = async (req, res) => {
  try {
    const session = await PomodoroSession.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!session) return res.status(404).json({ msg: 'Session not found' });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteSession = async (req, res) => {
  try {
    const session = await PomodoroSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ msg: 'Session not found' });
    res.json({ msg: 'Session deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
