const User = require('../models/User');
const passport = require('passport');

const authController = {
  // Handle user signup
  signup: async (req, res) => {
    try {
      // Check if required fields are present
      if (!req.body.email || !req.body.password || !req.body.userName) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        $or: [{ email: req.body.email }, { userName: req.body.userName }],
      });

      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Create new user
      const user = await User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      });

      // Log the user in after signup
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(201).json({ message: 'Signup successful' });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Handle user login
  login: (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!user) {
        return res.status(400).json({ error: info.message });
      }
      req.login(user, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.json({ message: 'Login successful' });
      });
    })(req, res, next);
  },

  // Handle user logout
  logout: (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Logout successful' });
    });
  },

  // Get current user info
  getCurrentUser: (req, res) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }
    res.json({
      id: req.user._id,
      userName: req.user.userName,
      email: req.user.email,
    });
  },
};

module.exports = authController;
