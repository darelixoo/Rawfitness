// models/Membership.js
const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    username: { type: String, required: true },
    membershipType: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

module.exports = mongoose.model('Membership', membershipSchema);
