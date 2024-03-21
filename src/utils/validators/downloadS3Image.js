

const validImageKey = (key) => {
    let isValid = { valid: false, message: 'Invalid image key.' };
    if (!key || key === '' || key === ' ') return isValid;
    isValid = { valid: true, message: '' };
    return isValid;
};

const validImageType = (type, validTypes) => {
    let isValid = { valid: false, message: 'Image type not valid.' };
    if (!type || type === '' || type === ' ') return isValid;
    if (!validTypes.includes(type)) return isValid;
    isValid = { valid: true, message: '' };
    return isValid;
};

const validDownloadS3Image = ({ key, type, config }) => {
    const keyValid = validImageKey(key);
    const validType = validImageType(type, config.validImageTypes);
    const downloads3ImageValid = {
        valid: keyValid.valid && validType.valid,
        message: {
            key: keyValid.message,
            type: validType.message,
        }
    }
    return downloads3ImageValid;
}

module.exports = {
    validImageKey,
    validImageType,
    validDownloadS3Image
};