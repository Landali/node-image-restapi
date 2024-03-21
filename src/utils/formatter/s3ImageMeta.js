
const formatMeta = ({ key, name, type, metadata }) => {

    const newMetadata = {
        key: (metadata.key === key || !key) ? metadata.key : key,
        name: (metadata.name === name || !name) ? metadata.name : name,
        type: (metadata.type === type || !type) ? metadata.type : type
    }
    return newMetadata;
}

module.exports = {
    formatMeta
};