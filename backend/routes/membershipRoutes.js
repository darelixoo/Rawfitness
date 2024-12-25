// routes/membershipRoutes.js
const express = require('express');
const { buyMembership } = require('../controllers/membershipController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware'); // ensure user is logged in

router.post('/buy', authMiddleware, buyMembership);

module.exports = router;
