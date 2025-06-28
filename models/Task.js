const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  assigned_to: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  group_id: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  status: { type: String, enum: ["pending", "in_progress", "completed"], default: "pending" },
  due_date: { type: Date },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Task", taskSchema);
// This code defines a Mongoose schema and model for managing tasks in a MongoDB database.
// The `taskSchema` includes fields for the task title, description, assigned user, group ID, status, due date, and creation date.
// The `assigned_to` field references the `User` model, allowing for efficient querying of user information.
// The `group_id` field references the `Group` model, linking tasks to specific groups.
// The `status` field indicates the current state of the task, with possible values of "pending", "in_progress", or "completed".
// The `due_date` field allows for setting a deadline for the task.
// The model is exported for use in other parts of the application, such as controllers and routes.
// This modular approach allows for better organization of code and separation of concerns, making it easier to maintain and extend the application in the future.
// The `created_at` field records the date and time when the task was created, defaulting to the current date and time.
// This code sets up a Mongoose schema and model for tasks in a collaborative application.
// It defines the structure of a task, including fields for title, description, assigned user, group ID, status, due date, and creation date.
// The `taskSchema` is used to create a Mongoose model named "Task", which can be used to perform CRUD operations on tasks in the database.
// The `assigned_to` field references the `User` model, allowing for efficient querying of user information.
// The `group_id` field references the `Group` model, linking tasks to specific groups.
// The `status` field indicates the current state of the task, with possible values of "pending", "in_progress", or "completed".
// The `due_date` field allows for setting a deadline for the task.
// The `created_at` field records the date and time when the task was created, defaulting to the current date and time.
// The model is exported for use in other parts of the application, such as controllers and routes.
// This modular approach allows for better organization of code and separation of concerns, making it easier to maintain and extend the application in the future.    