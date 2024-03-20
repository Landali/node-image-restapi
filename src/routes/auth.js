const { signIn, signUp, forgotPassword, resetPassword } = require('../controllers/v1/auth');
const { resetPasswordverifyToken } = require('../middlewares/jwtAuth');
module.exports = (router) => {

    router.get('/signIn', signIn);
    router.post('/signUp', signUp);
    router.get('/forgotPassword', forgotPassword);
    router.put('/resetPassword', resetPasswordverifyToken, resetPassword);
    
};