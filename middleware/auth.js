const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

// Middleware to authenticate token
const authenticateToken = async (req, res, next) => {
    // Extract the authorization header
    const authHeader = req.headers['authorization'];
    // Extract the token from the header
    const token = authHeader && authHeader.split(' ')[1];

    // If no token is provided, respond with a 401 status
    if (token == null) return res.status(401).json({ message: 'No token provided' });

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, '$Prince');
        // Find the user by the ID from the decoded token
        req.user = await User.findById(decoded.userId);
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token', error: error.message });
    }
};

module.exports = authenticateToken;
