const { signIn, signUp } = require('../controllers/v1/auth')

module.exports = (router) => {
    
    router.get('/signIn', signIn)
    router.post('/signUp', signUp)

};