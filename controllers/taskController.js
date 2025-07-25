const Task = require("../models/Task");
const mongoose = require("mongoose");

// Create a task
exports.createTask = async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Task stats
// Get total task count
exports.countAllTasks = async (req, res) => {
  try {
    const count = await Task.countDocuments();
    res.status(200).json({ totalTasks: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get count of pending tasks
exports.countPendingTasks = async (req, res) => {
  try {
    const count = await Task.countDocuments({ status: 'pending' });
    res.status(200).json({ totalPending: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get count of in-progress tasks
exports.countInProgressTasks = async (req, res) => {
  try {
    const count = await Task.countDocuments({ status: 'in-progress' });
    res.status(200).json({ totalInProgress: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get count of completed tasks
exports.countCompletedTasks = async (req, res) => {
  try {
    const count = await Task.countDocuments({ status: 'completed' });
    res.status(200).json({ totalCompleted: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.getAllTasks = async (req, res) => {
  try {
    console.log("🚀 Getting all tasks...");
    const tasks = await Task.find().populate("assigned_to", "full_name email");
    res.status(200).json(tasks);
  } catch (error) {
    console.error("❌ getAllTasks Error:", error);
    res.status(500).json({ error: error.message });
  }
};


// Get task by ID
exports.getTaskById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const task = await Task.findById(req.params.id).populate("assigned_to", "full_name email");
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get tasks by group ID
exports.getTasksByGroup = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.groupId)) {
      return res.status(400).json({ error: "Invalid group ID" });
    }
    const tasks = await Task.find({ group_id: req.params.groupId }).populate("assigned_to", "full_name email");
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a task by ID
exports.deleteTaskById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete all tasks
exports.deleteAllTasks = async (req, res) => {
  try {
    await Task.deleteMany({});
    res.status(200).json({ message: "All tasks deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};