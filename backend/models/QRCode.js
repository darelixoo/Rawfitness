// models/QRCode.js
const mongoose = require('mongoose');

const qrCodeSchema = new mongoose.Schema({
    username: { type: String, required: true },
    qrCode: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: '1d' } 
});

// Export the model
module.exports = mongoose.model('QRCode', qrCodeSchema);
