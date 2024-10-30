// routes/scan.js
const express = require('express');
const { scanQRCode } = require('../controllers/scanController');

const router = express.Router();

router.post('/scan', scanQRCode); // Create a POST endpoint to scan the QR code

module.exports = router;

// controllers/scanController.js

