// controllers/membershipController.js
const Membership = require('../models/Membership');
const User = require('../models/User');

exports.buyMembership = async (req, res) => {
    const { membershipType } = req.body;
    if (!membershipType) {
        return res.status(400).json({ message: "Membership type is required" });
    }
    const username = req.user.username; // Assuming middleware sets req.user from token

    const startDate = new Date();
    const endDate = new Date();

    // Calculate end date based on membership type
    if (membershipType === '1 month') endDate.setMonth(startDate.getMonth() + 1);
    else if (membershipType === '3 months') endDate.setMonth(startDate.getMonth() + 3);
    else if (membershipType === '6 months') endDate.setMonth(startDate.getMonth() + 6);
    else if (membershipType === '1 year') endDate.setFullYear(startDate.getFullYear() + 1);
    
    // Create membership
    const membership = new Membership({ username, membershipType, startDate, endDate });
    
    try {
        await membership.save();
        res.status(201).json({ message: "Membership purchased successfully." });
    } catch (error) {
        res.status(500).json({ message: 'Error purchasing membership', error });
    }
};
