const express = require('express');
// const Redis = require('ioredis');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');

console.log('Starting server initialization...');

const app = express();
console.log('Express app created');

// const redis = new Redis(process.env.REDIS_URL || 'redis://redis:6379');
// console.log('Redis client created');

// redis.on('connect', () => {
//   console.log('Successfully connected to Redis');
// });

// redis.on('error', (err) => {
//   console.error('Redis connection error:', err);
// });

app.use(cors());
app.use(express.json());

// Commented out all Redis/sample data initialization
// async function initializeRedis() {
//   // ... Redis initialization code ...
// }
// initializeRedis().catch(error => {
//   console.error('Failed to initialize Redis:', error);
//   process.exit(1);
// });

// Commented out all API routes that use Redis

// app.get('/api/category/:category', async (req, res) => {
//   res.json([]);
// });

// app.get('/api/blog/:id', async (req, res) => {
//   res.status(404).json({ error: 'Blog not found' });
// });

// app.post('/api/signup', async (req, res) => {
//   res.status(201).json({ message: 'User created successfully' });
// });

// app.post('/api/login', async (req, res) => {
//   res.json({ message: 'Login successful', token: 'dummy', username: req.body.username });
// });

// app.get('/api/author/:name', async (req, res) => {
//   res.status(404).json({ error: 'Author not found' });
// });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all to serve React's index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
