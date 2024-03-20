
const { jwtTokenVerify } = require('../utils/tokens/jwt');
const { PASSWORD_RESET_JWT_TOKEN_SECRET, JWT_TOKEN_SECRET } = require('../../settings');

const jwtVerification = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwtTokenVerify({
            token,
            tokenSecret: JWT_TOKEN_SECRET
        });

        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

const resetPasswordverifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {

        const decoded = jwtTokenVerify({
            token,
            tokenSecret: PASSWORD_RESET_JWT_TOKEN_SECRET
        });

        req.userId = decoded.userId;
        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};


module.exports = { jwtVerification, resetPasswordverifyToken };