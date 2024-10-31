// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const JWT_SECRET = "SuperSecure123";

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    
    // Check if the header is present
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }

    const token = authHeader.replace('Bearer ', '');
    console.log("Token Received:", token);

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("Decoded Token:", decoded);
        

        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Please Login First to Continue" });
    }
};
