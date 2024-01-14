const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes'); // Routes for Post entity
const commentRoutes = require('./routes/commentRoutes'); // Routes for Comment entity
const dbConnection = require('./database'); // Database connection

const app = express();

// Middleware
app.use(bodyParser.json());

// Database Connection
dbConnection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

// API Routes
app.use('/posts', postRoutes);       // Now accessible at http://localhost:3000/posts
app.use('/comments', commentRoutes); // Now accessible at http://localhost:3000/comments

// Basic 404 Handler
app.use((req, res, next) => {
    res.status(404).send('Resource not found');
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
