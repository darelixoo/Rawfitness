// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    qrCode: { type: String }, // QR code will be added here when a membership is active
});

module.exports = mongoose.model('User', userSchema);
