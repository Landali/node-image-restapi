const { searchImage } = require('../../services/unsplashApi');
const { paramsValidator } = require('../../utils/validators/unsplashApi');
const { awsS3, saveImageS3, getImageS3 } = require('../../services/awsS3');
const { validS3Image } = require('../../utils/validators/awsS3Images');
const { formatMeta } = require('../../utils/formatter/s3ImageMeta');
module.exports = {
    async getImages(req, res) {
        console.log('Get images');

        const params = paramsValidator(req.body);
        const images = await searchImage(params);

        return res.send({ Status: "Success", data: { ...images.data } })
    },
    async saveImage(req, res) {
        console.log('Save Image');
        const { key, image, type, name } = req.body
        // TODO: Save config for modular config. Retrieve dynamic userId.
        const validatingImage = {
            key: `65fa0dc9aecd50d61d0f2c20/${key}`,
            name,
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
        const savedImage = await saveImageS3(`<REPLACE_DYNAMIC_USER_ID>/${key}`, image, { name, type, key });
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
        const { key, type, name } = req.body;
        const { hasImage, image, metadata } = await getImageS3(`<REPLACE_DYNAMIC_USER_ID>/${key}`);
        console.log('Image exist on s3? ', hasImage);
        if (!hasImage) {
            return res.status(200).json({ Status: 'Unsuccess', data: [], message: 'Image not found.' });
        }

        const meta = formatMeta({ key, name, type, metadata });
        const savedImage = await saveImageS3(`<REPLACE_DYNAMIC_USER_ID>/${key}`, image, meta);

        return res.send({ Status: "Success" })
    }
}