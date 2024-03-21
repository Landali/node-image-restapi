const { jwtVerification } = require('../middlewares/jwtAuth');
const {
    getImages,
    saveS3Image,
    updateS3Image,
    downloadS3Image,
    getUserImages,
    saveUserImage,
    updateUserImage
} = require('../controllers/v1/images');

module.exports = (router) => {
    router.get('/getImages', jwtVerification, getImages);
    router.get('/getUserImages', jwtVerification, getUserImages);

    router.post('/saveS3Image', jwtVerification, saveS3Image);
    router.put('/updateS3Image', jwtVerification, updateS3Image);
    router.get('/downloadS3Image', jwtVerification, downloadS3Image);

    router.post('/saveUserImage', jwtVerification, saveUserImage);
    router.put('/updateUserImage', jwtVerification, updateUserImage);
};