// routes/challenges.js
const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge');

// GET all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find().populate('createdBy', 'username email');
    res.json(challenges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a challenge
router.post('/', async (req, res) => {
  const { title, description, progress, completed, points, createdBy } = req.body;
  if (!title || !createdBy) {
    return res.status(400).json({ msg: 'Please provide title and createdBy' });
  }
  try {
    const newChallenge = new Challenge({ title, description, progress, completed, points, createdBy });
    await newChallenge.save();
    res.json(newChallenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a challenge (e.g., marking complete)
router.put('/:id', async (req, res) => {
  try {
    const updatedChallenge = await Challenge.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedChallenge);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
