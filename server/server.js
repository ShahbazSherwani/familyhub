// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Import your routes
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

// Minimal root route so hitting '/' won't 404
app.get('/', (req, res) => {
  res.send('Hello from Family Hub server!');
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use your routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/memories', memoryRoutes);
app.use('/api/challenges', challengeRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/chat', chatRoutes);

// Create HTTP server & attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' }
});

// Socket.IO handling for chat
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('chatMessage', (data) => {
    console.log('Received chat message:', data);
    io.emit('chatMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// For local dev: only listen if we run `node server.js`
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

// Export the server for Vercel
module.exports = server;
