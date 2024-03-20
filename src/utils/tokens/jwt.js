const jwt = require('jsonwebtoken');

const {
    JWT_TOKEN_SECRET,
    TOKEN_DURATION,
    PASSWORD_RESET_JWT_TOKEN_SECRET,
    PASSWORD_RESET_TOKEN_DURATION
} = require('../../../settings');

const jwtSignIn = ({ id }) => {
    if (!id) return null;

    const token = jwt.sign({ userId: id }, JWT_TOKEN_SECRET, {
        expiresIn: TOKEN_DURATION,
    });
    return token;
}

const jwtForgotPasswordSignIn = ({ id }) => {
    if (!id) return null;

    const token = jwt.sign({ userId: id }, PASSWORD_RESET_JWT_TOKEN_SECRET, {
        expiresIn: PASSWORD_RESET_TOKEN_DURATION,
    });
    return token;
}

const jwtTokenVerify = ({ token, tokenSecret }) => {
    if (!token || !tokenSecret) return null;
    const decode = jwt.verify(token, tokenSecret);
    return decode;
};


module.exports = { jwtSignIn, jwtForgotPasswordSignIn, jwtTokenVerify };