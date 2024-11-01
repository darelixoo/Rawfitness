const QRCode = require('qrcode');
const Membership = require('../models/Membership');
//const QRCodeModel = require('../models/QRCode');

exports.getQR = async (req, res) => {
    try {
        // Sirf valid membership fetch karein
        const membership = await Membership.findOne({ 
            username: req.user.username, 
            endDate: { $gt: new Date() }  // Filter to get only active membership
        });

        if (!membership) {
            return res.status(404).json({ message: 'No active membership found' });
        }

        const qrData = {
            username: req.user.username,
            membershipType: membership.membershipType,
            validUntil: membership.endDate
        };

        const qrCode = await QRCode.toDataURL(JSON.stringify(qrData));
        console.log("Generated QR Code:", qrCode);

     

        res.json({ qrCode });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error generating QR code', error });
    }
};
