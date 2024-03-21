const { formatUserImageUrls } = require('../../../utils/formatter/userImageUrls');

const urlsMock = {
    full: 'https://full-url.jpg',
    regular: 'https://regular-url.jpg',
    small: 'https://small-url.jpg',
    thumb: 'https://thumb-url.jpg'
}

describe('userImageUrlsTest', () => {

    test('Should return a valid ugrl object', async () => {
        const urls = {
            full: 'https://full-url.jpg',
            regular: 'https://regular-url.jpg',
            small: 'https://small-url.jpg',
            thumb: 'https://thumb-url.jpg'
        }

        const newUrls = formatUserImageUrls(urls);
        expect(newUrls).toEqual(urlsMock);
    });
    test('Should return a object with no urls ', async () => {
        const urls = {
            full: '',
            regular: 'https://regular-url.jpg',
            small: 'https://small-url.jpg',
            thumb: 'https://thumb-url.jpg'
        }

        const newUrls = formatUserImageUrls(urls);
        expect(newUrls).not.toEqual(urlsMock);
    });
    test('Should return a url with empty string if url is null ', async () => {
        const urls = {
            full: null,
            regular: 'https://regular-url.jpg',
            small: 'https://small-url.jpg',
            thumb: 'https://thumb-url.jpg'
        }

        const newUrls = formatUserImageUrls(urls);
        expect(newUrls).toEqual({
            full: '',
            regular: 'https://regular-url.jpg',
            small: 'https://small-url.jpg',
            thumb: 'https://thumb-url.jpg'
        });
    });
    test('Should return only regular, full, small and thumb urls ', async () => {
        const urls = {
            full: 'https://full-url.jpg',
            regular: 'https://regular-url.jpg',
            small: 'https://small-url.jpg',
            thumb: 'https://thumb-url.jpg',
            mini: 'https://mini-url.jpg'
        }

        const newUrls = formatUserImageUrls(urls);
        expect(newUrls).toEqual(urlsMock);
    });
});