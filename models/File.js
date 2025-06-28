// File.js
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
filename: { type: String, required: true },
url: { type: String, required: true },
uploadedBy: { type: String, required: true },
uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', FileSchema);