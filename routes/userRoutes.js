const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserData } = require('../controllers/userController');

// Register a new user
router.post('/signup', registerUser);

// Login a user
router.post('/login', loginUser);

// Fetch user data (dummy data for testing)
router.get('/data', getUserData);

module.exports = router;
