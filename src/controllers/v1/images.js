const { searchImage } = require('../../services/unsplashApi')


module.exports = {
    async getImages(req, res) {
        console.log('Saving images', req.body);
        const images = await searchImage(req.body);
        return res.send({ Status: "Success", data: { ...images.data } })
    }
}