const fs = require('fs');
const path = require('path');
const logFilePath = path.join(__dirname, '../data/transactions.json');

function logTransaction(data) {
  const timestamp = new Date().toISOString();
  const transaction = { ...data, timestamp };

  let existingLogs = [];

  if (fs.existsSync(logFilePath)) {
    const fileData = fs.readFileSync(logFilePath, 'utf-8');
    try {
      existingLogs = JSON.parse(fileData);
    } catch (e) {
      existingLogs = [];
    }
  }

  existingLogs.push(transaction);
  fs.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2));
}

module.exports = { logTransaction };
