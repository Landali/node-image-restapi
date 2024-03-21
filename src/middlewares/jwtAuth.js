
const { jwtTokenVerify, verifyValidToken, verifyValidResetPassword } = require('../utils/tokens/jwt');
const { PASSWORD_RESET_JWT_TOKEN_SECRET, JWT_TOKEN_SECRET } = require('../../settings');

const jwtVerification = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {

        verifyValidToken(req, res, next, token);

    } catch (error) {
        console.error('Error on token middleware', error.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};

const resetPasswordverifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {

        verifyValidResetPassword(req, res, next, token)

    } catch (error) {
        console.error('Error on token middleware', error.message);
        res.status(401).json({ error: 'Invalid token' });
    }
};


module.exports = { jwtVerification, resetPasswordverifyToken };