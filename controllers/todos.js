const Todo = require('../models/Todo');

// Controller object containing all our todo-related methods
const todoController = {
  // Get all todos for the logged-in user
  getTodos: async (req, res) => {
    try {
      // Find all todos belonging to current user, sorted by creation date
      const userTodos = await Todo.find({ user: req.user.id }).sort({
        createdAt: 'desc',
      });

      // Send the found todos back to the client
      res.json(userTodos);
    } catch (err) {
      // If something goes wrong, send back error message
      res.status(500).json({ error: err.message });
    }
  },

  // Create a new todo
  createTodo: async (req, res) => {
    try {
      // Check if title was provided
      if (!req.body.title) {
        return res.status(400).json({ error: 'Title is required' });
      }

      // Create new todo with data from request
      const todo = await Todo.create({
        title: req.body.title,
        user: req.user.id, // Associate todo with current user
        completed: false, // New todos start as incomplete
      });

      // Send back the created todo
      res.status(201).json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Toggle todo completion status
  toggleComplete: async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      todo.completed = !todo.completed; // Toggle the completed status
      await todo.save();
      res.json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Update Todo
  updateTodo: async (req, res) => {
    try {
      const { title } = req.body;
      const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        { title },
        { new: true } // Return the updated todo
      );
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }
      res.json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Delete a todo
  deleteTodo: async (req, res) => {
    try {
      // Find the todo
      const todo = await Todo.findById(req.params.id);

      // If todo doesn't exist, return error
      if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      // Make sure todo belongs to current user
      if (todo.user.toString() !== req.user.id) {
        return res.status(403).json({ error: 'Not authorized' });
      }

      // Delete the todo
      await todo.deleteOne();

      res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = todoController;
