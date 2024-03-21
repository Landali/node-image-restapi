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
    const decode = jwt.decode(token, tokenSecret);
    return decode;
};

const verifyValidToken = (request, response, next, token) => {
    jwt.verify(token, JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('jwt error: ', {
                name: err.name,
                message: err.message,

            })
            if (err.name === 'TokenExpiredError') {
                return response.status(401).json({
                    error: err.name,
                    message: err.message
                });;
            }
            return response.status(401).json({
                message: 'Error Verifying access token'
            });;
        }

        request.userId = decoded.userId;
        return next();
    })
    if (!token) {
        return response.status(401).json({
            message: 'User is not authorized or token is missing'
        });
    }
}

const verifyValidResetPassword = (request, response, next, token) => {
    jwt.verify(token, PASSWORD_RESET_JWT_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('jwt error: ', {
                name: err.name,
                message: err.message,

            })
            if (err.name === 'TokenExpiredError') {
                return response.status(401).json({
                    error: err.name,
                    message: err.message
                });;
            }
            return response.status(401).json({
                message: 'Error Verifying access token'
            });;
        }

        request.userId = decoded.userId;
        return next();
    })
    if (!token) {
        return response.status(401).json({
            message: 'User is not authorized or token is missing'
        });
    }
}


module.exports = { jwtSignIn, jwtForgotPasswordSignIn, jwtTokenVerify, verifyValidToken, verifyValidResetPassword };