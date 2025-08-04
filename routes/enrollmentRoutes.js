const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollmentController');

// Defines the route for the main enrollment endpoint.
// POST /api/ecosystem-enroll
router.post('/ecosystem-enroll', enrollmentController.enrollUser);

module.exports = router;

