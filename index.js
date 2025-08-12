require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

// Route imports
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const mapRoutes = require('./routes/mapRoutes');
const crmRoutes = require('./routes/crmSync'); // ✅ Add this route

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecosystem';

// --- Middleware ---
app.use(cors());
app.use(express.json());

// ✅ Serve static admin UI and logs
app.use('/admin', express.static(path.join(__dirname, 'public/admin')));
app.use('/data', express.static(path.join(__dirname, 'data'))); // exposes transactions.json

// --- MongoDB Connection ---
mongoose.connect(mongoUri)
  .then(() => console.log(`✅ Connected to MongoDB at ${mongoUri}`))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Stop app if DB connection fails
  });

// --- API Routes ---
app.use('/api', enrollmentRoutes);
app.use('/api', mapRoutes);
app.use('/api', crmRoutes); // ✅ Register CRM sync endpoint

// --- Root Endpoint ---
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Welcome to the Ecosystem API Layer. See README.md for usage.' 
    });
});

// --- 404 Handler ---
app.use((req, res, next) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// --- Global Error Handler ---
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ error: 'Malformed JSON' });
    }
    console.error(err.stack);
    res.status(500).json({ error: 'An unexpected internal server error occurred.' });
});

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
