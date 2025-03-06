const mongoose = require('mongoose');

const MemorySchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  caption: { type: String },
  timestamp: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Memory', MemorySchema);
