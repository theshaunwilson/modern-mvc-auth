const express = require('express');
// Create a new router object to handle our auth routes
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// POST /signup - Handle new user registration
// This route expects: userName, email, and password in the request body
router.post('/signup', async (req, res) => {
  try {
    // Attempt to create a new user in the database
    // req.body contains the data sent from the client (like form data)
    const user = await User.create({
      userName: req.body.userName, // Get username from request
      email: req.body.email, // Get email from request
      password: req.body.password, // Get password from request
      // Password will be automatically hashed by our User model
    });

    // If user creation was successful, send back a success message
    // Status 201 means "Created Successfully"
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    // If there's an error (like duplicate email), send back error message
    // Status 500 means "Server Error"
    res.status(500).json({ error: err.message });
  }
});

// POST /login - Handle user login
// passport.authenticate('local') is middleware that checks the username/password
router.post('/login', passport.authenticate('local'), (req, res) => {
  // If we get here, authentication was successful
  // Passport has already created the session for us
  res.json({ message: 'Logged in successfully' });
});

// GET /logout - Handle user logout
// This route destroys the session and logs out the user
router.get('/logout', (req, res) => {
  // req.logout() is a function added by passport
  // It removes the user from the session
  req.logout(function (err) {
    if (err) {
      // If there's an error logging out, send error message
      return res.status(500).json({ error: err.message });
    }
    // If logout successful, send success message
    res.json({ message: 'Logged out successfully' });
  });
});

// Export the router so we can use it in our main server file
module.exports = router;
