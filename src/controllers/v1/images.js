const { searchImage } = require('../../services/unsplashApi');
const { paramsValidator } = require('../../utils/validators/unsplashApi');

module.exports = {
    async getImages(req, res) {
        console.log('Saving images', req.body);

        const params = paramsValidator(req.body);
        const images = await searchImage(params);
        
        return res.send({ Status: "Success", data: { ...images.data } })
    }
}