const jwt = require('jsonwebtoken');

const {
    JWT_TOKEN_SECRET,
    TOKEN_DURATION,
} = require('../../../settings');

const jwtSignIn = ({ id }) => {
    if (!id) return null;

    const token = jwt.sign({ userId: id }, JWT_TOKEN_SECRET, {
        expiresIn: TOKEN_DURATION,
    });
    return token;
}


module.exports = { jwtSignIn };