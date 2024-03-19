module.exports = (router) => {
    router.get('/signIn', (req, res) => {
        console.log('Signed In!');
        return res.send({ Status: "Success" })
    })

    router.post('/signUp', (req, res) => {
        console.log('Signed Up!');
        return res.send({ Status: "Success" })
    })
};