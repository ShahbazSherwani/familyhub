// routes/memories.js
const express = require('express');
const router = express.Router();
const Memory = require('../models/Memory');

// GET all memories
router.get('/', async (req, res) => {
  try {
    const memories = await Memory.find().populate('createdBy', 'username email');
    res.json(memories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a memory
router.post('/', async (req, res) => {
  const { imageUrl, caption, createdBy } = req.body;
  if (!imageUrl || !createdBy) {
    return res.status(400).json({ msg: 'Please provide imageUrl and createdBy' });
  }
  try {
    const newMemory = new Memory({ imageUrl, caption, createdBy });
    await newMemory.save();
    res.json(newMemory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
