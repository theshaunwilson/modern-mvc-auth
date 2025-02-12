const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const connectDB = require('./config/database');
require('dotenv').config();

// Initialize express app
const app = express();

// Connect to database
connectDB();

// Logging middleware
app.use(morgan('dev'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo API!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
