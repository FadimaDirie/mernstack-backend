// Load environment variables
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Import Routes







// ✅ only once
const taskRoutes = require('./routes/taskRoutes');

const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');

const groupMemberRoutes = require('./routes/groupMemberRoutes'); // ✅

const metricRoutes = require('./routes/metricRoutes');
// const groupMemberRoutes = require('./routes/groupMemberRoutes');




dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// const notificationRoutes = require('./routes/notification.Routes'); // ✅
// const notificationRoutes = require('./routes/notification.Routes');

// Connect to MongoDB
connectDB();

// API Routes
app.use('/api/users', userRoutes);
app.use('/api', groupRoutes);
app.use('/api/groups', groupMemberRoutes);
app.use(express.json());
// Adjust prefix as needed
app.use('/api/tasks', taskRoutes);

app.use('/api/files', fileRoutes);

app.use('/api/metrics', metricRoutes);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Export app for testing or further configuration
module.exports = app;