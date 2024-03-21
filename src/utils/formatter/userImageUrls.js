
const formatUserImageUrls = (urls) => {

    const myUrls = urls || {}

    const newUrls = {
        full: myUrls.full || '',
        regular: myUrls.regular || '',
        small: myUrls.small || '',
        thumb: myUrls.thumb || ''
    }

    return newUrls
}

module.exports = {
    formatUserImageUrls
};