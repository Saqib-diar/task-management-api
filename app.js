const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

const app = express();
app.use(express.json());
app.use(helmet());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// test check endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'API is running successfully' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


module.exports = app;