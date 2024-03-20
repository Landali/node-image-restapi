
const validImage = (image, regex) => {
    let isValid = { valid: false, message: 'Invalid image.' };
    if (!image) return isValid;
    if (regex.enabled) {
        const newRegex = new RegExp(regex.regex, regex.notation);
        if (image.match(newRegex)) {
            isValid = { valid: true, message: '' };
            return isValid;
        }
        return isValid;
    }
    isValid = { valid: true, message: '' };
    return isValid;
};

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

const validS3Image = ({ key, image, type, config }) => {
    const imageValid = validImage(image, config.regex);
    const keyValid = validImageKey(key);
    const validType = validImageType(type, config.validImageTypes);
    const s3ImageValid = {
        valid: imageValid.valid && keyValid.valid && validType.valid,
        message: {
            image: imageValid.message,
            key: keyValid.message,
            type: validType.message
        }
    }
    return s3ImageValid;
}


module.exports = {
    validS3Image,
    validImageType,
    validImageKey,
    validImage
};