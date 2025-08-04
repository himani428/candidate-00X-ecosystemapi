const express = require('express');
const router = express.Router();
const mapController = require('../controllers/mapController');
const { verifyApiKey } = require('../middleware/auth');

// Defines routes for managing the enrollment rule map.

// GET /api/enrollment-map - Publicly accessible to view the map
router.get('/enrollment-map', mapController.getMap);

// POST /api/enrollment-map - Protected: Replaces the entire map
router.post('/enrollment-map', verifyApiKey, mapController.replaceMap);

// PATCH /api/enrollment-map - Protected: Updates the map
router.patch('/enrollment-map', verifyApiKey, mapController.updateMap);

module.exports = router;

