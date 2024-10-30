const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure to protect this route

// Route to get the QR code for the logged-in user
router.get('/generate', authMiddleware, qrController.getQR);

module.exports = router;
