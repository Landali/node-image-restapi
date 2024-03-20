const { jwtVerification } = require('../middlewares/jwtAuth');
const { getImages, saveS3Image, updateS3Image, getUserImages, saveUserImage } = require('../controllers/v1/images');
module.exports = (router) => {
    router.get('/getImages', jwtVerification, getImages);
    router.post('/saveS3Image', jwtVerification, saveS3Image);
    router.put('/updateS3Image', jwtVerification, updateS3Image);
    router.get('/getUserImages', jwtVerification, getUserImages);
    router.post('/saveUserImage', jwtVerification, saveUserImage);
};