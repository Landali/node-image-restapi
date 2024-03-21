const { searchImage } = require('../../services/unsplashApi');
const { paramsValidator } = require('../../utils/validators/unsplashApi');
const { saveImageS3, getImageS3 } = require('../../services/awsS3');
const { validS3Image } = require('../../utils/validators/awsS3Images');
const { formatMeta } = require('../../utils/formatter/s3ImageMeta');
const { jwtTokenVerify } = require('../../utils/tokens/jwt');
const { searchImageFilters } = require('../../utils/formatter/getImages');
const { JWT_TOKEN_SECRET, DOWNLOAD_IMAGE_PATH } = require('../../../settings');
const { validateUserImage } = require('../../utils/validators/saveImage');
const { validDownloadS3Image } = require('../../utils/validators/downloadS3Image');
const { formatUserImageUrls } = require('../../utils/formatter/userImageUrls');
const imageDownloader = require('node-image-downloader');
const Images = require('../../models/image');

module.exports = {
    async getImages(req, res) {
        console.log('Retrieving images from provider ...');

        const params = paramsValidator(req.body);
        const images = await searchImage(params);
        return res.status(200).json({ Status: "Success", data: { ...images.data } });
    },
    async saveS3Image(req, res) {
        console.log('Saving image to bucket ... ');
        const { key, image, type, name } = req.body

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
            return res.status(400).json({ Status: 'Unsuccess', data: null, message });
        }
        const savedImage = await saveImageS3(`${decoded.userId}/${key}`, image, { name, type, key });
       
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

        console.log('Updating image on bucket ... ');
        const { key, type, name } = req.body;
        const token = req.header('Authorization');
        const decoded = jwtTokenVerify({ token, tokenSecret: JWT_TOKEN_SECRET });
        const { hasImage, image, metadata } = await getImageS3(`${decoded.userId}/${key}`);

        if (!hasImage) {
            return res.status(404).json({ Status: 'Unsuccess', data: [], message: 'Image not found.' });
        }

        const meta = formatMeta({ key, name, type, metadata });
        const savedImage = await saveImageS3(`${decoded.userId}/${key}`, image, meta);

        return res.status(200).json({ Status: "Success", message, data: savedImage });
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

        res.status(200).json({ Status: "Success", data: images, error });
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
            return res.status(400).json({ Status: 'Unsuccess', data: {}, message });
        }

        const imageExist = await Images.findUserImageByKey({ user: decoded.userId, key: details.key });

        if (imageExist.error) {
            return res.status(404).json({ Status: 'Unsuccess', data: imageExist, message: imageExist.error });
        }

        if (imageExist.image.length > 0) {
            return res.status(404).json({ Status: 'Unsuccess', data: imageExist, message: 'Image already exist for user.' });
        }

        const savedImage = Images.saveUserImage({
            user: decoded.userId, details: { ...details, url: imageurls }
        });

        if (savedImage.error) {
            return res.status(400).json({ Status: 'Unsuccess', data: {}, message: savedImage.error });
        }

        return res.status(200).json({ Status: 'Success', data: savedImage.image, message: 'Image Saved!' });
    },
    async updateUserImage(req, res) {
        console.log('Updating user image ...');

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
            return res.status(400).json({ Status: 'Unsuccess', data: {}, message });
        }

        const imageExist = await Images.findUserImageByKey({ user: decoded.userId, key: details.key });

        if (imageExist.error) {
            return res.status(404).json({ Status: 'Unsuccess', data: imageExist, message: imageExist.error });
        }

        if (imageExist.image.length === 0) {
            return res.status(404).json({ Status: 'Unsuccess', data: imageExist, message: 'Image does not exist for user.' });
        }

        const updatedImage = Images.updateUserImage({
            user: decoded.userId, details: { ...details, url: imageurls }
        });

        if (updatedImage.error) {
            return res.status(400).json({ Status: 'Unsuccess', data: {}, message: savedImage.error });
        }
        return res.status(200).json({ Status: 'Success', data: updatedImage.image, message: 'Image updated!' });
    },
    async downloadS3Image(req, res) {
        console.log('Downloading user image ...');
        const { key, type } = req.body;

        const token = req.header('Authorization');
        const decoded = jwtTokenVerify({ token, tokenSecret: JWT_TOKEN_SECRET });
        const config = {
            validImageTypes: ['jpg', 'png']
        };
        const { valid, message } = validDownloadS3Image({ key, type, config });

        if (!valid) {
            return res.status(400).json({ Status: 'Unsuccess', error: message });
        }

        const { hasImage, image, metadata } = await getImageS3(`${decoded.userId}/${key}`);
        if (!hasImage) {
            return res.status(404).json({ Status: 'Unsuccess', error: 'Image not found!' });
        }

        imageDownloader({
            imgs: [
                {
                    uri: `${image}.${type}`,
                    filename: `${metadata.name}-${Math.random()}`,
                }
            ],
            dest: DOWNLOAD_IMAGE_PATH, //destination folder
        })
            .then((info) => {
                console.log('Downloading image successful', info);
                return res.status(200).json({ Status: 'Success', error: null });
            })
            .catch((error, response, body) => {
                console.error('Something when wrong while downloading image: ', error.message);
                return res.status(401).json({ Status: 'Unsuccess', error: error.message });
            })
    }
}