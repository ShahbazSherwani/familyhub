// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Route imports
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const memoryRoutes = require('./routes/memories');
const challengeRoutes = require('./routes/challenges');
const locationRoutes = require('./routes/location');
const chatRoutes = require('./routes/chat');

const app = express();

// Middleware
app.use(cors());
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
app.use('/api/chat', chatRoutes);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' } // In production, restrict origins
});

// Socket.IO handling for chat
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('chatMessage', (data) => {
    console.log('Received chat message:', data);
    // Broadcast the message to all connected clients
    io.emit('chatMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// For local development: run server.listen only if we're executing server.js directly
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// Export the server for Vercel
module.exports = server;
