// backend/controllers/authController.js
const users = require('../data/data'); // temp in-memory storage
const jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
  const { email, password } = req.body;

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  users.push({ email, password });
  return res.status(201).json({ message: 'User registered successfully' });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Check against stored users
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Sign a JWT token
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'defaultsecret', { expiresIn: '1h' });
  return res.status(200).json({ token });
};
