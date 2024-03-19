const { signIn, signUp, forgotPassword } = require('../controllers/v1/auth');

module.exports = (router) => {

    router.get('/signIn', signIn);
    router.post('/signUp', signUp);
    router.get('/forgotPassword', forgotPassword);
};