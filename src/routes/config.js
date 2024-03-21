const { saveConfigsToStore } = require('../controllers/v1/config');

module.exports = (router) => {

    router.get('/setupConfig', saveConfigsToStore);

};