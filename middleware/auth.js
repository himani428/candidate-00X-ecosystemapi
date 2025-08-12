const verifyApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const expectedApiKey = process.env.API_KEY;

    console.log('Client-sent key:', apiKey);
    console.log('Expected key:', expectedApiKey);

    if (!apiKey) {
        return res.status(401).json({ error: 'Unauthorized: API key is missing.' });
    }

    if (apiKey !== expectedApiKey) {
        return res.status(403).json({ error: 'Forbidden: Invalid API key.' });
    }

    next();
};

module.exports = { verifyApiKey };