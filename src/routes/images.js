const { jwtVerification } = require('../middlewares/jwtAuth');

module.exports = (router) => {
    router.get('/getImages', jwtVerification, (req, res) => {
        console.log('Retrieving images');
        return res.send({ Status: "Success" })
    })

    router.post('/saveImage', jwtVerification, (req, res) => {
        console.log('Saving images');
        return res.send({ Status: "Success" })
    })
};