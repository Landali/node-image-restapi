const { jwtVerification } = require('../middlewares/jwtAuth');
const { getImages } = require('../controllers/v1/images');
module.exports = (router) => {
    router.get('/getImages', jwtVerification, getImages)

    router.post('/saveImage', jwtVerification, (req, res) => {
        console.log('Saving images');
        return res.send({ Status: "Success" })
    })
};