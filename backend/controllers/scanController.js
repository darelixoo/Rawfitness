//const QRCodeModel = require('../models/QRCode');
const MembershipModel = require('../models/Membership'); // Membership model import karein

exports.scanQRCode = async (req, res) => {
    const { qrCode } = req.body; // Expect QR code data in the request body

    try {
        // 1. Scanned QR code data ko parse karein (assuming it's in JSON string format)
        const scannedData = JSON.parse(qrCode);

        // 2. Membership model mein username se validate karein
        const { username } = scannedData; // Extract username from scanned data
        const membership = await MembershipModel.findOne({ username });

        if (!membership) {
            return res.status(404).json({ message: 'Membership not found or invalid.' });
        }

        // 3. Optional: Membership validity check (if required)
        const currentDate = new Date();
        if (new Date(membership.validUntil) < currentDate) {
            return res.status(403).json({ message: 'Membership has expired.' });
        }

        // 4. If found, successful check-in response
        res.json({ message: 'Check-in successful', membership });
    } catch (error) {
        console.error('Error during QR code scanning:', error);
        res.status(500).json({ message: 'Error during QR code scanning', error });
    }
};
