const { saveConfigsToStore } = require('../controllers/v1/config');
const { jwtVerification } = require('../middlewares/jwtAuth');
module.exports = (router) => {

    router.get('/setupConfig', jwtVerification, saveConfigsToStore);

};