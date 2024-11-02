const MembershipModel = require('../models/Membership');

exports.scanQRCode = async (req, res) => {
    const { qrCode } = req.body; // Expect QR code data in the request body

    try {
        // Parse the scanned QR code data (assuming it's in JSON string format)
        const scannedData = JSON.parse(qrCode);

        // Extract details from scanned data
        const { username, generatedAt } = scannedData;

        // Validate the membership exists
        const membership = await MembershipModel.findOne({ username });
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found or invalid.' });
        }

        // Check if the QR code was generated within the last 20 seconds
        const generatedTime = new Date(generatedAt);
        const currentTime = new Date();
        const timeDifference = currentTime - generatedTime;

        if (timeDifference > 20000) { // 20 seconds in milliseconds
            return res.status(403).json({ message: 'QR code has expired.' });
        }

        // Check membership validity
        if (new Date(membership.validUntil) < currentTime) {
            return res.status(403).json({ message: 'Membership has expired.' });
        }

        // Successful check-in response
        res.json({ message: 'Check-in successful', membership });
    } catch (error) {
        console.error('Error during QR code scanning:', error);
        res.status(500).json({ message: 'Error during QR code scanning', error });
    }
};
