const { searchImage } = require('../../services/unsplashApi');
const { paramsValidator } = require('../../utils/validators/unsplashApi');

module.exports = {
    async getImages(req, res) {
        console.log('Get images');

        const params = paramsValidator(req.body);
        const images = await searchImage(params);

        return res.send({ Status: "Success", data: { ...images.data } })
    },
    async saveImage(req, res) {
        console.log('Save Image');
        return res.send({ Status: "Success" })
    }
}