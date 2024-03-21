const { validImage } = require('../../../utils/validators/awsS3Images');

const config = {
    regex: {
        enabled: true,
        regex: 'https?:\/\/(\\bimages.unsplash.com\/\\bphoto\\-\\b.{13}\-\\b.{12}\\?\\b.{36}(\\b(jpg|png)))',
        notation: 'i'
    }
}

describe('userImageUrlsTest', () => {

    test('Should return a valid unsplash url object', async () => {
        const image = 'https://images.unsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080';

        const imageValid = validImage(image, config.regex)
        const response = { valid: true, message: '' }
        expect(imageValid).toEqual(response);
    });
    test('Should return valid = false if unsplash url is not valid', async () => {
        const image = 'https://imagesunsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080';

        const imageValid = validImage(image, config.regex)
        const response = { valid: false, message: '' }
        expect(imageValid.valid).toBe(response.valid);
    });

    test('Should return valid = false if no unsplash url is given', async () => {
        const image = '';

        const imageValid = validImage(image, config.regex)
        const response = { valid: false, message: '' }
        expect(imageValid.valid).toBe(response.valid);
    });

    test('Should return valid = false if unsplash url is null', async () => {

        const imageValid = validImage(null, config.regex)
        const response = { valid: false, message: '' }
        expect(imageValid.valid).toBe(response.valid);
    });
    test('Should return valid = true if regex is disabled', async () => {

        const image = 'https://imagesunsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080';
        const configs = {
            regex: {
                enabled: false,
                regex: 'https?:\/\/(\\bimages.unsplash.com\/\\bphoto\\-\\b.{13}\-\\b.{12}\\?\\b.{36}(\\b(jpg|png)))',
                notation: 'i'
            }
        }
        const imageValid = validImage(image, configs.regex)
        const response = { valid: true, message: '' }
        expect(imageValid.valid).toBe(response.valid);
    });

    test('Should return valid = true if no regex ', async () => {

        const image = 'https://images.unsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080';
        const configs = {
            regex: {
                enabled: true,
                regex: '',
                notation: 'i'
            }
        }
        const imageValid = validImage(image, configs.regex)
        const response = { valid: true, message: '' }
        expect(imageValid.valid).toBe(response.valid);
    });

    test('Should return valid = true if regex is null ', async () => {

        const image = 'https://images.unsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080';
        const configs = {
            regex: {
                enabled: true,
                regex: '',
                notation: 'i'
            }
        }
        const imageValid = validImage(image, configs.regex)
        const response = { valid: true, message: '' }
        expect(imageValid.valid).toBe(response.valid);
    });
});