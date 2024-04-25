const express = require('express');
const dbConnection = require('./config/dbConnection');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

// Initialize Express app
const app = express();

// Establish database connection
dbConnection();

// Load environment variables
const env = require('dotenv').config();

// Set up middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// Define routes
app.use('/api/contacts', require('./routes/contactsRoutes')); // Example route for contacts
app.use('/api/users', require('./routes/userRoutes')); // Example route for users

// Error handling middleware
app.use(errorHandler);

// Define port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
    console.log('Server is running on port', port);
});
