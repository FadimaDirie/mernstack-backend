//File controller for handaling file uploads and retrievals
const File = require('../models/File');

// Upload a file
exports.uploadFile = async (req, res) => {
try {
    const file = new File(req.body);
    await file.save();
    res.status(201).json(file);
} catch (err) {
    res.status(400).json({ error: err.message });
}
};

// Get all files
exports.getAllFiles = async (req, res) => {
try {
    const files = await File.find();
    res.json(files);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};