// routes/location.js
const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// GET all location updates
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find().populate('userId', 'username email');
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add/update a location
router.post('/', async (req, res) => {
  const { userId, latitude, longitude } = req.body;
  if (!userId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ msg: 'Please provide userId, latitude, and longitude' });
  }
  try {
    const newLocation = new Location({ userId, latitude, longitude });
    await newLocation.save();
    res.json(newLocation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
