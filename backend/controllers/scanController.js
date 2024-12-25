const MembershipModel = require('../models/Membership');

exports.scanQRCode = async (req, res) => {
    const { qrCode } = req.body; // expect qr code data in the request body

    try {
        // parse the scanned qr code data (assuming it's in JSON string format)
        const scannedData = JSON.parse(qrCode);

        // extract details from scanned data
        const { username, generatedAt } = scannedData;

        // validate the membership exists
        const membership = await MembershipModel.findOne({ username });
        if (!membership) {
            return res.status(404).json({ message: 'Membership not found or invalid.' });
        }

        // check if the qr code was generated within the last 20 seconds
        const generatedTime = new Date(generatedAt);
        const currentTime = new Date();
        const timeDifference = currentTime - generatedTime;

        if (timeDifference > 20000) { // 20 seconds
            return res.status(403).json({ message: 'QR code has expired.' });
        }

        // check membership validity
        if (new Date(membership.validUntil) < currentTime) {
            return res.status(403).json({ message: 'Membership has expired.' });
        }

        // successful check-in response
        res.json({ message: 'Check-in successful', membership });
    } catch (error) {
        console.error('Error during QR code scanning:', error);
        res.status(500).json({ message: 'Error during QR code scanning', error });
    }
};
