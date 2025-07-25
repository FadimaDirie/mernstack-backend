const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
  
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
