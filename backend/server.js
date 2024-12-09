const cors = require('cors');
const express = require('express');
const path = require('path');

// Initialize the app
const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());

// Import the database connection
const db = require('./db/dbConnection');

// Middleware to parse JSON
app.use(express.json());

// Routes
const spacesRoutes = require('./routes/spaces');
app.use('/api/spaces', spacesRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
