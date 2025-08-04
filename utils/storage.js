const fs = require('fs').promises;
const path = require('path');

const mapFilePath = path.join(__dirname, '..', 'data', 'ruleMap.json');

/**
 * Asynchronously reads and parses the rule map from the JSON file.
 * @returns {Promise<object>} - A promise that resolves to the rule map object.
 */
const getRuleMap = async () => {
    try {
        const data = await fs.readFile(mapFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading rule map file:', error);
        // If the file doesn't exist or is corrupted, return an empty object
        return {};
    }
};

/**
 * Asynchronously writes a new rule map object to the JSON file.
 * @param {object} data - The new rule map object to write.
 * @returns {Promise<void>}
 */
const writeRuleMap = async (data) => {
    try {
        await fs.writeFile(mapFilePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error('Error writing to rule map file:', error);
        throw new Error('Could not update the rule map.');
    }
};

module.exports = {
    getRuleMap,
    writeRuleMap,
};