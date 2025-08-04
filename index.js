require('dotenv').config();

const express = require('express');
const cors = require('cors');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const mapRoutes = require('./routes/mapRoutes');

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
// Enable Cross-Origin Resource Sharing for all routes
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// --- API Routes ---
app.use('/api', enrollmentRoutes);
app.use('/api', mapRoutes);

// --- Root Endpoint ---
// A simple welcome message for the root URL to confirm the server is running
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to the Ecosystem API Layer. See README.md for usage.' 
    });
});

// --- 404 Not Found Handler ---
// Catch-all for any request that doesn't match a defined route
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// --- Global Error Handler ---
// Catch-all for any errors that occur during request processing
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected internal server error occurred.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

