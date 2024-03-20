const { searchImage } = require('../../services/unsplashApi');
const { paramsValidator } = require('../../utils/validators/unsplashApi');
const { saveImageS3, getImageS3 } = require('../../services/awsS3');
const { validS3Image } = require('../../utils/validators/awsS3Images');
const { formatMeta } = require('../../utils/formatter/s3ImageMeta');
const { jwtTokenVerify } = require('../../utils/tokens/jwt');
const { searchImageFilters } = require('../../utils/formatter/getImages');
const { JWT_TOKEN_SECRET } = require('../../../settings');
const { validateUserImage } = require('../../utils/validators/saveImage');
const { formatUserImageUrls } = require('../../utils/formatter/userImageUrls');

const Images = require('../../models/image');

module.exports = {
    async getImages(req, res) {
        console.log('Get images');

        const params = paramsValidator(req.body);
        const images = await searchImage(params);

        return res.send({ Status: "Success", data: { ...images.data } })
    },
    async saveS3Image(req, res) {
        console.log('Save Image');
        const { key, image, type, name } = req.body
        // TODO: Save config for modular config.
        const token = req.header('Authorization');
        const decoded = jwtTokenVerify({ token, tokenSecret: JWT_TOKEN_SECRET });

        const validatingImage = {
            key: `${decoded.userId}/${key}`,
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
        const savedImage = await saveImageS3(`${decoded.userId}/${key}`, image, { name, type, key });
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
    async updateS3Image(req, res) {

        console.log('Updating Image');
        const { key, type, name } = req.body;
        const token = req.header('Authorization');
        const decoded = jwtTokenVerify({ token, tokenSecret: JWT_TOKEN_SECRET });
        const { hasImage, image, metadata } = await getImageS3(`${decoded.userId}/${key}`);
        console.log('Image exist on s3? ', hasImage);
        if (!hasImage) {
            return res.status(200).json({ Status: 'Unsuccess', data: [], message: 'Image not found.' });
        }

        const meta = formatMeta({ key, name, type, metadata });
        const savedImage = await saveImageS3(`${decoded.userId}/${key}`, image, meta);

        return res.send({ Status: "Success" })
    },
    async getUserImages(req, res) {

        console.log('Retrieving user saved images ...');
        const { page, perPage } = req.body;
        const token = req.header('Authorization');
        const decoded = jwtTokenVerify({ token, tokenSecret: JWT_TOKEN_SECRET });
        const { newPage, newPerPage } = searchImageFilters({ page, perPage });

        const { images, error } = await Images.findUserImages({
            user: decoded.userId,
            page: newPage,
            perPage: newPerPage
        });

        return res.send({ Status: "Success", data: images, error })
    },
    async saveUserImage(req, res) {
        console.log('Saving user image ...');
        const { details } = req.body;
        const token = req.header('Authorization');
        const decoded = jwtTokenVerify({ token, tokenSecret: JWT_TOKEN_SECRET });

        const { url } = details;
        const imageurls = formatUserImageUrls(url);

        const { valid, message } = validateUserImage({
            user: decoded.userId,
            details: { ...details, url: imageurls },
            validTypes: ['jpg', 'png']
        });
        if (!valid) {
            return res.status(401).json({ Status: 'Unsuccess', data: {}, message });
        }

        const savedImage = Images.saveUserImage({
            user: decoded.userId, details: { ...details, url: imageurls }
        });

        if (savedImage.error) {
            return res.status(401).json({ Status: 'Unsuccess', data: {}, message: savedImage.error });
        }

        return res.status(401).json({ Status: 'Success', data: savedImage.image, message: 'Image Saved!' });
    }
}