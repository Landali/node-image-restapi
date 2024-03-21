const { formatMeta } = require('../../../utils/formatter/s3ImageMeta');

const metaMock = {
    key: 'key1',
    name: 'name1',
    type: 'jpg'
}

describe('s3ImageMetaTest', () => {

    test('Should return a valid metadata for s3 image.', async () => {
        const meta = formatMeta({
            key: 'key1',
            name: 'name1',
            type: 'jpg',
            metadata: metaMock
        })
        expect(meta).toEqual(metaMock);
    });
    test('Should return meta updated from metadata', async () => {
        const meta = formatMeta({
            key: 'key2',
            name: 'name1',
            type: 'jpg',
            metadata: metaMock
        })
        expect(meta).not.toEqual(metaMock);
    });
    test('Should return same metadata if one parameter is missing', async () => {
        const meta = formatMeta({
            name: 'name1',
            type: 'jpg',
            metadata: metaMock
        })
        expect(meta).toEqual(metaMock);
    });
    test('Should return same metadata if one parameter is null', async () => {
        const meta = formatMeta({
            name: 'name1',
            type: 'jpg',
            metadata: metaMock
        })
        expect(meta).toEqual(metaMock);
    });
});