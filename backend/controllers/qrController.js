const QRCode = require('qrcode');
const Membership = require('../models/Membership');

exports.getQR = async (req, res) => {
    try {
        // Fetch valid membership
        const membership = await Membership.findOne({ 
            username: req.user.username, 
            endDate: { $gt: new Date() }  // Only active membership
        });

        if (!membership) {
            return res.status(404).json({ message: 'No active membership found' });
        }

        const qrData = {
            username: req.user.username,
            membershipType: membership.membershipType,
            validUntil: membership.endDate,
            generatedAt: new Date().toISOString()  // Add generated timestamp for expiry check
        };

        const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        console.log("Generated QR Code:", qrCode);

        res.json({ qrCode });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error generating QR code', error });
    }
};
