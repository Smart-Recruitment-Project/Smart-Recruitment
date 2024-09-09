const jwt = require('jsonwebtoken');
const secretKey = "manoj";

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateJWT;