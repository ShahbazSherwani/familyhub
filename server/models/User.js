// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Optionally store the latest location in user document
  location: {
    latitude: Number,
    longitude: Number,
    updatedAt: Date
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
