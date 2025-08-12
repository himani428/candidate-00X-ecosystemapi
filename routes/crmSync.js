const express = require('express');
const router = express.Router();

router.post('/crm-sync', (req, res) => {
  console.log("Simulating CRM Sync:", req.body);
  res.status(200).json({ message: 'CRM sync simulated successfully.' });
});

module.exports = router;
