const { getRuleMap } = require('../utils/storage');
const { isValidEmail, isValidISO8601 } = require('../utils/validators');
const { logTransaction } = require('../utils/logger');
const Enrollment = require('../models/Enrollment'); // Mongoose model

/**
 * Handles the user enrollment request, validates it, and fires simulated syncs.
 */
const enrollUser = async (req, res) => {
    const { email, source, timestamp } = req.body;

    // 1. Validate input fields
    const errors = [];
    if (!email) {
        errors.push('email is required');
    } else if (!isValidEmail(email)) {
        errors.push('Invalid email format');
    }

    if (!source) {
        errors.push('source is required');
    }

    if (!timestamp) {
        errors.push('timestamp is required');
    } else if (!isValidISO8601(timestamp)) {
        errors.push('Invalid timestamp format');
    }

    if (errors.length > 0) {
        const hasFormatErrors = errors.some(e => e.includes('format'));
        return res.status(hasFormatErrors ? 422 : 400).json({
            error: hasFormatErrors ? 'Unprocessable Entity' : 'Bad Request',
            details: errors
        });
    }

    try {
        // 2. Get rule map for destinations
        const ruleMap = await getRuleMap();
        const destinations = ruleMap[source] || [];

        if (destinations.length === 0) {
            return res.status(200).json({
                message: 'Enrollment processed. No destination syncs required for this source.',
                destinations: [],
                status: []
            });
        }

        // 3. Simulate POSTs to destinations
        const statusReport = [];
        const datePart = timestamp.split('T')[0]; // YYYY-MM-DD

        console.log(`\n--- Initiating Sync for ${email} from source: ${source} ---`);

        for (const dest of destinations) {
            const payload = {
                email,
                source: "ecosystem-sync",
                enrolledOn: datePart
            };

            // Simulate POST
            console.log(`Simulating POST to ${dest} with payload:`, JSON.stringify(payload));
            console.log(`--> ${dest} responded with: 200 OK`);

            statusReport.push({ platform: dest, status: 'SUCCESS' });
        }

        console.log(`--- Sync complete for ${email} ---\n`);

        // 4. Log to transactions.json
        logTransaction({
            email,
            source,
            destinations
        });

        // ✅ 5. Save to MongoDB with full details
        await Enrollment.create({
            email,
            source,
            destinations,
            timestamp: new Date(timestamp)
        });

        // 6. Return response
        res.status(200).json({
            message: 'Enrollment processed successfully.',
            destinations,
            status: statusReport
        });

    } catch (error) {
        console.error('Enrollment processing error:', error);
        res.status(500).json({ error: 'An internal server error occurred during enrollment.' });
    }
};

/**
 * Returns total number of enrollments
 */
const getTotalEnrollments = async (req, res) => {
    try {
        const total = await Enrollment.countDocuments();
        res.status(200).json({ total });
    } catch (err) {
        console.error('Error fetching total enrollments:', err);
        res.status(500).json({ error: 'Failed to fetch total enrollments' });
    }
};

/**
 * Returns most recent 10 enrollments
 */
const getRecentEnrollments = async (req, res) => {
    try {
        const recent = await Enrollment.find()
            .sort({ timestamp: -1 }) // Sorting by actual timestamp, not createdAt
            .limit(10);
        res.status(200).json(recent);
    } catch (err) {
        console.error('Error fetching recent enrollments:', err);
        res.status(500).json({ error: 'Failed to fetch recent enrollments' });
    }
};

module.exports = {
    enrollUser,
    getTotalEnrollments,
    getRecentEnrollments
};
