// routes/chat.js
const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');

// GET chat history
router.get('/', async (req, res) => {
  try {
    const messages = await ChatMessage.find().populate('userId', 'username');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new chat message
router.post('/', async (req, res) => {
  const { text, userId } = req.body;
  if (!text || !userId)
    return res.status(400).json({ msg: 'Please provide text and userId' });
  try {
    const newMessage = new ChatMessage({ text, userId });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
