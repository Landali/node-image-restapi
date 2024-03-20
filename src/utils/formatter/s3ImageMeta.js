
const formatMeta = ({ key, name, type, metadata }) => {
    console.log('Meta params: ', key, name, type, metadata);
    const newMetadata = {
        key: metadata.key === key ? metadata.key : key,
        name: metadata.name === name ? metadata.name : name,
        type: metadata.type === type ? metadata.type : type
    }
    return newMetadata;
}

module.exports = {
    formatMeta
};