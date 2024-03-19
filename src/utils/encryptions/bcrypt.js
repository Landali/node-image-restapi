const bcrypt = require('bcrypt');
const { PASSWORD_SALT } = require('../../../settings');

const parseSalt = () => {
    const salt = typeof PASSWORD_SALT === 'string' ? parseInt(PASSWORD_SALT) : PASSWORD_SALT;
    return salt;
}

const hashPassword = async (password) => {
    if (!password) return null;
    const salt = parseSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const comparePasswords = async (password, currentPassword) => {
    if (!password || !currentPassword) return null;
    const match = bcrypt.compare(password, currentPassword);
    return match;
}

module.exports = { hashPassword, comparePasswords };