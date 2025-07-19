







// TODO: Add your task-related routes here
// Example:
// router.post('/', createTask);
// router.get('/', getTasks);
// router.get('/:id', getTask);
// router.put('/:id', updateTask);
// router.delete('/:id', deleteTask);

 

const express = require("express");
const router = express.Router();

const {
  createTask,
  getAllTasks,
  getTaskById,
  getTasksByGroup,
  updateTask,
  deleteTaskById,
  deleteAllTasks
} = require("../controllers/taskController");
const auth = require('../middlewares/authMiddleware');


// TODO: Add your task-related routes here
// Example:
// router.post('/', createTask);
// router.get('/', getTasks);
// router.get('/:id', getTask);
// router.put('/:id', updateTask);
// router.delete('/:id', deleteTask);





// Create a new task
router.post("/", createTask);

// Get all tasks
// Put more specific route first
router.get("/api/tasks/", getAllTasks);         // ✅ This matches exact
router.get("/api/tasks/:id", getTaskById);      // ✅ This is fallback for /:id


// Get tasks by group ID
router.get("/group/:groupId", getTasksByGroup);

// Update a task by ID
router.put("/:id", updateTask);

// Delete a task by ID
router.delete("/:id", deleteTaskById);

// Delete all tasks
router.delete("/", deleteAllTasks);

// Placeholder route
router.get('/', (req, res) => {
  res.send('Tasks route is working');
});

module.exports = router;
