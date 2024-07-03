const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        try {
            const token = authHeader.split(' ')[1];
            
            const decoded = jwt.verify(token, "Gajanan@123");
            console.log(`Token verified. User email: ${decoded}`);

            req.user = decoded;

            next();
        } catch (error) {
            console.error(`Token verification failed: ${error.message}`);
            res.status(401).json({ message: 'Authorization failed: Invalid or expired token.' });
        }
    } else {
        res.status(401).json({ message: 'Authorization failed: No token provided.' });
    }
};

module.exports = authenticate;
