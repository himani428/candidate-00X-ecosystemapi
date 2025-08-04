const { getRuleMap } = require('../utils/storage');
const { isValidEmail, isValidISO8601 } = require('../utils/validators');

/**
 * Handles the user enrollment request, validates it, and fires simulated syncs.
 */
const enrollUser = async (req, res) => {
    const { email, source, timestamp, apikey } = req.body;

    // 1. Validate API Key from the request body
    if (apikey !== process.env.API_KEY) {
        return res.status(403).json({ error: 'Forbidden: Invalid API key.' });
    }

    // 2. Validate input fields
    const errors = [];
    if (!isValidEmail(email)) {
        errors.push('Invalid or missing email format.');
    }
    if (!source || typeof source !== 'string') {
        errors.push('Invalid or missing source.');
    }
    if (!isValidISO8601(timestamp)) {
        errors.push('Invalid or missing timestamp. Must be ISO-8601 format.');
    }

    if (errors.length > 0) {
        return res.status(400).json({ error: 'Bad Request', details: errors });
    }

    try {
        // 3. Look up the Rule Map
        const ruleMap = await getRuleMap();
        const destinations = ruleMap[source] || [];

        if (destinations.length === 0) {
            return res.status(200).json({
                message: 'Enrollment processed. No destination syncs required for this source.',
                destinations: [],
                status: []
            });
        }

        // 4. Fire simulated POST to each destination
        const statusReport = [];
        const datePart = timestamp.split('T')[0]; // Extract YYYY-MM-DD

        console.log(`\n--- Initiating Sync for ${email} from source: ${source} ---`);

        for (const dest of destinations) {
            const payload = {
                email: email,
                source: "ecosystem-sync",
                enrolledOn: datePart
            };

            // This simulates the POST request as per the instructions
            console.log(`Simulating POST to ${dest} with payload:`, JSON.stringify(payload));
            console.log(`--> ${dest} responded with: 200 OK`);
            
            statusReport.push({ platform: dest, status: 'SUCCESS' });
        }
        console.log(`--- Sync complete for ${email} ---\n`);

        // 5. Return JSON summary
        res.status(200).json({
            message: 'Enrollment processed successfully.',
            destinations: destinations,
            status: statusReport
        });

    } catch (error) {
        console.error('Enrollment processing error:', error);
        res.status(500).json({ error: 'An internal server error occurred during enrollment.' });
    }
};

module.exports = {
    enrollUser,
};

