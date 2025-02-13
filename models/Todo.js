// Import mongoose
const mongoose = require('mongoose');

// Define the structure for our todo items
const TodoSchema = new mongoose.Schema(
  {
    // The actual todo text that user enters
    title: {
      type: String,
      required: true,
    },
    // Whether the todo is completed or not
    completed: {
      type: Boolean,
      default: false, // Todos start as not completed
    },
    // Reference to the user who created this todo
    // This creates a relationship between Todo and User
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    // Add timestamps to track when todos are created/updated
    timestamps: true,
  }
);

module.exports = mongoose.model('Todo', TodoSchema);
