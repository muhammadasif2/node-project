const express = require('express');
const dbConnection = require('./config/dbConnection');
const cors = require('cors');
const errorHandler = require('./middleware/errosHandler');

// Initialize Express app
const app = express();

// Establish database connection
dbConnection();

// Load environment variables
const env = require('dotenv').config();

// Set up middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies
// app.use(cors({
//     origin: 'https://example.com',
//     methods: ['GET', 'POST', 'PUT', 'DELETE']
//   }));
//   app.options('*', cors());
// Define routes
app.get('/', function (req, res) {
  res.send('Hello World!');
});
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
