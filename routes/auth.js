const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// Add debug log for router
console.log('Auth routes are being loaded');

// Add debug middleware for auth routes
router.use((req, res, next) => {
  console.log('Auth route hit:', req.method, req.path);
  next();
});

// Routes for authentication
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.get('/user', authController.getCurrentUser);

module.exports = router;
