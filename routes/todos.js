const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todos');

// Create a middlewear to check if users are logged in
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Please log in to access this resource' });
};

// Apply isAuthenticated middleware to all todo routes
router.use(isAuthenticated);

// Get all todos for logged in user
router.get('/', todoController.getTodos);

// Create a new todo
router.post('/create', todoController.createTodo);

// Toggle todo completion status
router.put('/:id/toggle', todoController.toggleComplete);

// Edit a Todo
router.put('/:id', todoController.updateTodo);

// Delete a todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
