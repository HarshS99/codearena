const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rating: { type: Number, default: 1200 },
  solvedProblems: [{ type: String }],
  bookmarks: [{ type: String }],
  notes: [{
    problemId: { type: String },
    content: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);