// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const memoryRoutes = require('./routes/memories');
const challengeRoutes = require('./routes/challenges');
const locationRoutes = require('./routes/location');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/location', locationRoutes);

// Socket.IO for live chat
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('New client connected: ' + socket.id);

  socket.on('chatMessage', (data) => {
    console.log('Received chat message: ', data);
    // Broadcast the message to all connected clients
    io.emit('chatMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected: ' + socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
