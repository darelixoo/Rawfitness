const QRCodeModel = require('../models/QRCode');

exports.scanQRCode = async (req, res) => {
    const { qrCode } = req.body; // Expect QR code data in the request body

    try {
        // Check if the QR code exists in the database
        const existingQRCode = await QRCodeModel.findOne({ qrCode });
        
        if (!existingQRCode) {
            return res.status(404).json({ message: 'QR code not found or invalid.' });
        }

        // If found, you can perform any additional checks here (e.g., check membership validity)

        res.json({ message: 'Check-in successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error during QR code scanning', error });
    }
};