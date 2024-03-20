const { searchImage } = require('../../services/unsplashApi');
const { paramsValidator } = require('../../utils/validators/unsplashApi');
const { awsS3, saveImageS3, getImageS3 } = require('../../services/awsS3');
const { validS3Image } = require('../../utils/validators/awsS3Images');

module.exports = {
    async getImages(req, res) {
        console.log('Get images');

        const params = paramsValidator(req.body);
        const images = await searchImage(params);

        return res.send({ Status: "Success", data: { ...images.data } })
    },
    async saveImage(req, res) {
        console.log('Save Image');
        const { key, image, type } = req.body
        // TODO: Save config for modular config.
        const validatingImage = {
            key,
            image,
            type,
            config: {
                regex: {
                    enabled: true,
                    regex: 'https?:\/\/(\\bimages.unsplash.com\/\\bphoto\\-\\b.{13}\-\\b.{12}\\?\\b.{36}(\\b(jpg|png)))',
                    notation: 'i'
                },
                validImageTypes: ['jpg', 'png']
            }
        }
        const { valid, message } = validS3Image(validatingImage);
        if (!valid) {
            return res.status(401).json({ Status: 'Unsuccess', data: null, message });
        }
        const savedImage = await saveImageS3(`${key}.${type}`, image);
        console.log('Image was saved? ', savedImage)
        if (!savedImage) {
            return res.status(401).json({
                Status: 'Unsuccess',
                data: null,
                message: { ...message, saved: 'Could not save image.' }
            });
        }
        return res.status(200).json({ Status: 'Success', data: image, message });
    },
    async updateImage(req, res) {
        console.log('Updating Image');
        const { key, type, newKey } = req.body;
        const imageExist = await getImageS3(`${key}.${type}`);
        console.log('Image exist on s3? ', imageExist);

        if (!imageExist) {
            return res.status(200).json({ Status: 'Unsuccess', data: [], message: 'Image not found.' });
        }
        return res.send({ Status: "Success" })
    }
}