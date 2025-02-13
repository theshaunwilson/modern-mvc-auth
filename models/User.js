// Import mongoose to create our User model
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the structure of our User document
const UserSchema = new mongoose.Schema(
  {
    // Username field = required and must be unique
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    // Email field - required and must be unique
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // Password field - required for authentication
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Add timestamps: Automatically create 'createdAt' and 'updatedAt'
    timestamps: true,
  }
);

// Middleware: Run this code before saving any user to the database
// This automatically encrpts the password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    // Generate a 'salt' - random data to make our encryption more secure
    const salt = await bcrypt.genSalt(10);

    // Hash the password along with our sale
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Add a method to help us verify passwords later
// This will be used when users try to log in
UserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Compare the provided password with the stored hash
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Create and export the User model
module.exports = mongoose.model('User', UserSchema);
