const express = require('express');
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

// Routes
const { router: authRoutes } = require('./routes/auth');
const dataRoutes = require('./routes/data');

app.use('/api/auth', authRoutes);
app.use('/api/data', dataRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🧪 Test: http://localhost:${PORT}/api/auth/test`);
});