/* Middleware to verify the API key provided in the request header.
 * This is used for protecting the Rule Map admin endpoints.
 */
const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const expectedApiKey = process.env.API_KEY;

    if (!apiKey) {
        return res.status(401).json({ error: 'Unauthorized: API key is missing.' });
    }

    if (apiKey !== expectedApiKey) {
        return res.status(403).json({ error: 'Forbidden: Invalid API key.' });
    }

    // If the key is valid, proceed to the next middleware or route handler
    next();
};

module.exports = { verifyApiKey };
