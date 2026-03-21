const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  problemId: { type: String, required: true },
  problemTitle: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  status: { type: String, required: true },
  runtime: { type: String },
  memory: { type: String },
  passedTests: { type: Number },
  totalTests: { type: Number },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
