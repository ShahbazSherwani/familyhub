const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET all events (for all users)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('createdBy', 'username email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create an event
router.post('/', async (req, res) => {
  const { title, time, date, createdBy } = req.body;
  if (!title || !time || !date || !createdBy) {
    return res.status(400).json({ msg: 'Please provide title, time, date, and createdBy' });
  }
  try {
    const newEvent = new Event({ title, time, date, createdBy });
    await newEvent.save();
    res.json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
