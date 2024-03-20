const { jwtVerification } = require('../middlewares/jwtAuth');
const { getImages, saveImage } = require('../controllers/v1/images');
module.exports = (router) => {
    router.get('/getImages', jwtVerification, getImages)

    router.post('/saveImage', jwtVerification, saveImage)
};