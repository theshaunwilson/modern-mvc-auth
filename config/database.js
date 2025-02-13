// Import mongoose for MongoDB interactions
const mongoose = require('mongoose');

// Function to connect to MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from enviroment variables
    const conn = await mongoose.connect(process.env.DB_STRING);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // If connection fails, log error and exit application
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

// Export the function
module.exports = connectDB;
