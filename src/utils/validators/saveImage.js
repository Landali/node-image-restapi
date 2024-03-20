

const validateUser = (user) => {
    const valid = { valid: false, message: 'Invalid user.' };
    if (!user || user === '' || user === ' ') return valid
    valid.valid = true;
    valid.message = '';
    return valid;
}

const validateName = (name) => {
    const valid = { valid: false, message: 'Invalid image name.' };
    if (!name || name === '' || name === ' ') return valid
    valid.valid = true;
    valid.message = '';
    return valid;
}

const validateType = (type, validTypes) => {
    const valid = { valid: false, message: 'Invalid image type.' };
    if (!type || type === '' || type === ' ') return valid;
    if (!validTypes.includes(type)) return valid;
    valid.valid = true;
    valid.message = '';
    return valid;
}

const validateKey = (key) => {
    const valid = { valid: false, message: 'Invalid image key.' };
    if (!key || key === '' || key === ' ') return valid;
    valid.valid = true;
    valid.message = '';
    return valid;
}

const validateDescription = (description) => {
    const valid = { valid: false, message: 'Invalid image description.' };
    if (!description || description === '' || description === ' ') return valid
    valid.valid = true;
    valid.message = '';
    return valid;
}

const validateUrls = (urls) => {
    const valid = { valid: false, message: 'Invalid image urls.' };
    if (!urls) return valid;
    if (!urls.full || !urls.regular || !urls.small || !urls.thumb) return valid;
    if (!urls.full === '' || !urls.regular === '' || !urls.small === '' || !urls.thumb === '') return valid;
    if (!urls.full === ' ' || !urls.regular === ' ' || !urls.small === ' ' || !urls.thumb === ' ') return valid;
    valid.valid = true;
    valid.message = '';
    return valid;
}

const validateUserImage = ({ user, details, validTypes }) => {
    const { name, type, description, key, url } = details || {};
    const validUser = validateUser(user);
    const validName = validateName(name);
    const validType = validateType(type, validTypes);
    const validKey = validateKey(key);
    const validDescription = validateDescription(description);
    const validUrls = validateUrls(url);
    const validImage = {
        valid: validUser.valid
            && validName.valid
            && validType.valid
            && validKey.valid
            && validDescription.valid
            && validUrls.valid,
        message: {
            user: validUser.message,
            name: validName.message,
            type: validType.message,
            key: validKey.message,
            description: validDescription.message,
            url: validUrls.message
        }
    }
    return validImage;
}

module.exports = {
    validateUserImage,
    validateUser,
    validateKey,
    validateName,
    validateType,
    validateDescription,
    validateUrls
};