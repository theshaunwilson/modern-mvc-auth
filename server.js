// Import express - our web framework that handles routing and middleware
const express = require('express');

// Import mongoose - helps us interact with MongoDB using models
const mongoose = require('mongoose');

// Import passport - handles user authentication (login/signup)
const passport = require('passport');

// Import express-session - manages user sessions (keeping users logged in)
const session = require('express-session');

// Import connect-mongo - stores our sessions in MongoDB instead of memory
const MongoStore = require('connect-mongo');

// Import morgan - logs HTTP requests for debugging
const morgan = require('morgan');

// Import our database connection function
const connectDB = require('./config/database');

// Import the passport configuration we created
const initializePassport = require('./config/passport-config');

// Import our auth routes
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
require('dotenv').config();

// Create our express application
const app = express();

// Connect to our MongoDB database
connectDB();

// Set up session middleware - this manages user login state
app.use(
  session({
    // Secret used to sign the session cookie
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    // Don't save session if unmodified
    resave: false,
    // Don't create session until something is stored
    saveUninitialized: false,
    // Store sessions in MongoDB
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING }),
  })
);

// Passport setup
// Set up passport with our configuration
initializePassport(passport);
// Initialize passport middleware
app.use(passport.initialize());

// Middleware
// Allow passport to use sessions
app.use(passport.session());
// Use morgan for logging HTTP requests
app.use(morgan('dev'));
// Parse JSON bodies (for API requests)
app.use(express.json());
// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));
// Serve static files from 'public' directory
app.use(express.static('public'));

// Connect auth routes - all auth routes with start with /auth
app.use('/auth', authRoutes);

// Home Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Todo API!' });
});

// Server
// Define port for server to listen on (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;
// Start server and listen for requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
