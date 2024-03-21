
const { storeInit, setStorageItem } = require('../../services/serverStore');

module.exports = {
    async saveConfigsToStore(req, res) {
        console.log('Adding global configuration ...');
        await storeInit();

        const globalConfigs = {
            validImageTypes: ['jpg', 'png'],
            regex: {
                enabled: true,
                regex: 'https?:\/\/(\\bimages.unsplash.com\/\\bphoto\\-\\b.{13}\-\\b.{12}\\?\\b.{36}(\\b(jpg|png)))',
                notation: 'i'
            }
        }

        const stored = await setStorageItem('globalConfig', globalConfigs);

        if (!stored) {
            console.warn('Could not set global configurations!');
            return res.status(404).json({ Status: 'Unsuccess', error: 'Could not set global configurations!' });
        }

        return res.status(200).json({ Status: 'Success', message: 'Configuration Saved!' });
    }
}