// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require('./routes/auth');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB (remove deprecated options if necessary)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: '*' } // For development only; restrict in production.
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('New client connected: ' + socket.id);

  socket.on('chatMessage', (data) => {
    console.log('Received message: ', data);
    // Broadcast the message to all connected clients.
    io.emit('chatMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected: ' + socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
