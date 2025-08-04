
const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    // A common regex for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

/**
 * Validates if a string is a valid ISO 8601 timestamp.
 * @param {string} timestamp - The timestamp string to validate.
 * @returns {boolean} - True if the timestamp is valid, false otherwise.
 */
const isValidISO8601 = (timestamp) => {
    if (!timestamp || typeof timestamp !== 'string') return false;
    // Regex to check for ISO 8601 format (e.g., 2025-06-05T10:00:00Z)
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[\+\-]\d{2}:\d{2})$/;
    return regex.test(timestamp) && !isNaN(Date.parse(timestamp));
};

module.exports = {
    isValidEmail,
    isValidISO8601,
};