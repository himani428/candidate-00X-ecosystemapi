const { getRuleMap, writeRuleMap } = require('../utils/storage');

/**
 * GET /api/enrollment-map
 * Retrieves and returns the current enrollment rule map.
 */
const getMap = async (req, res) => {
    try {
        const ruleMap = await getRuleMap();
        res.status(200).json(ruleMap);
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve the rule map.' });
    }
};

/**
 * POST /api/enrollment-map
 * Replaces the entire rule map with the new data from the request body.
 */
const replaceMap = async (req, res) => {
    const newMap = req.body;

    // Basic validation to ensure the body is a non-null object
    if (!newMap || typeof newMap !== 'object' || Array.isArray(newMap)) {
        return res.status(400).json({ error: 'Invalid map data. Must be a JSON object.' });
    }

    try {
        await writeRuleMap(newMap);
        res.status(200).json({ message: 'Rule map replaced successfully.', newMap });
    } catch (error) {
        res.status(500).json({ error: 'Failed to replace the rule map.' });
    }
};

/**
 * PATCH /api/enrollment-map
 * Updates or adds new entries to the existing rule map.
 */
const updateMap = async (req, res) => {
    const updates = req.body;

    if (!updates || typeof updates !== 'object' || Array.isArray(updates)) {
        return res.status(400).json({ error: 'Invalid update data. Must be a JSON object.' });
    }

    try {
        const currentMap = await getRuleMap();
        // Merge the updates into the current map
        const updatedMap = { ...currentMap, ...updates };
        
        await writeRuleMap(updatedMap);
        res.status(200).json({ message: 'Rule map updated successfully.', updatedMap });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update the rule map.' });
    }
};

module.exports = {
    getMap,
    replaceMap,
    updateMap,
};

