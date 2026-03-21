const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!', port: 5001 });
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/codearena')
  .then(() => console.log('MongoDB connected successfully! 🎉'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const { router: authRoutes } = require('./routes/auth');
const dataRoutes = require('./routes/data');

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5001; // Changed to 5001
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/auth/test`);
});