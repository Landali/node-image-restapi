const storage = require('node-persist');


const defaultConfigs = {
    globalConfig: {
        validImageTypes: ['jpg', 'png'],
        regex: {
            enabled: false,
            regex: '',
            notation: 'i'
        }
    }
}


const setStorageItem = async (key, item) => {
    if (!key || !item) {
        console.warn('Invalid Set storage item keys');
        return false;
    }

    await storage.setItem(key, item);
    return true;
}

const getStorageItem = async (key) => {
    try {
        if (!key) {
            console.warn('Invalid get storage item key');
            return null;
        }
        const item = await storage.getItem(key);
        return item;
    } catch (error) {
        console.error('Error to retrieve storage item', error.message);
        return defaultConfigs[key];
    }
}

const updateStorageItem = async (key, item) => {
    if (!key || !item) {
        console.warn('Invalid update storage item keys');
        return false;
    }
    await storage.updateItem(key, item);
    return true;

}
const deleteStorageItem = async (key) => {
    if (!key) {
        console.warn('Invalid remove storage item key');
        return null;
    }
    await storage.removeItem(key);
    return true;
}

const clearStorage = async () => {
    await storage.clear();
}

const getAllStorage = async () => {
    const store = await storage.values();
    return store;
}

const storeInit = async () => {

    const options = {
        dir: process.env.APPDATA,
        stringify: JSON.stringify,
        parse: JSON.parse,
        encoding: 'utf8',
        logging: false,
        ttl: false,
        // every 2 minutes the process will clean-up the expired cache
        expiredInterval: 2 * 60 * 1000,
        forgiveParseErrors: false,
        writeQueue: true,
        writeQueueIntervalMs: 1000,
        writeQueueWriteOnlyLast: true,
    }

    await storage.init(options);

}

module.exports = {
    storeInit,
    setStorageItem,
    getStorageItem,
    updateStorageItem,
    deleteStorageItem,
    getAllStorage,
    clearStorage
};