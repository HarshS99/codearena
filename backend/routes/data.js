const router = require('express').Router();
const User = require('../models/User');
const Submission = require('../models/Submission');
const { auth } = require('./auth');

// Toggle Bookmark
router.post('/bookmark', auth, async (req, res) => {
  try {
    const { problemId } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    const index = user.bookmarks.indexOf(problemId);
    if (index === -1) {
      user.bookmarks.push(problemId);
    } else {
      user.bookmarks.splice(index, 1);
    }

    await user.save();
    res.json({ bookmarks: user.bookmarks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Save Note
router.post('/note', auth, async (req, res) => {
  try {
    const { problemId, content } = req.body;
    const user = await User.findById(req.user.id);
    
    const noteIndex = user.notes.findIndex(n => n.problemId === problemId);
    if (noteIndex === -1) {
      user.notes.push({ problemId, content });
    } else {
      user.notes[noteIndex].content = content;
    }

    await user.save();
    res.json({ notes: user.notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get Notes
router.get('/notes', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ notes: user.notes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Save Submission
router.post('/submission', auth, async (req, res) => {
  try {
    const { problemId, problemTitle, code, language, status, runtime, memory, passedTests, totalTests } = req.body;
    
    const submission = new Submission({
      userId: req.user.id,
      problemId,
      problemTitle,
      code,
      language,
      status,
      runtime,
      memory,
      passedTests,
      totalTests
    });

    await submission.save();

    // If accepted, add to solved problems
    if (status === 'Accepted') {
      const user = await User.findById(req.user.id);
      if (!user.solvedProblems.includes(problemId)) {
        user.solvedProblems.push(problemId);
        await user.save();
      }
    }

    res.json(submission);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get Submissions
router.get('/submissions', auth, async (req, res) => {
  try {
    const submissions = await Submission.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json(submissions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
