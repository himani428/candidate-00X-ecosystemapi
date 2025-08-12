const express = require('express');
const router = express.Router();

const enrollmentController = require('../controllers/enrollmentController');
const { verifyApiKey } = require('../middleware/auth');

console.log("Controller Keys:", Object.keys(enrollmentController)); // 🔍 DEBUG

router.post(
  '/ecosystem-enroll',
  verifyApiKey,
  enrollmentController.enrollUser
);

router.get('/enrollments/total', enrollmentController.getTotalEnrollments);
router.get('/enrollments/recent', enrollmentController.getRecentEnrollments);

module.exports = router;
