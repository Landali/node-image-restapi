let axios = require('axios');
let { searchImage } = require('../../../services/unsplashApi');



const unsplashApiResponse = {
    "Status": "Success",
    "data": {
        "total": 3481,
        "total_pages": 871,
        "results": [
            {
                "id": "c_w9ylBGkdI",
                "created_at": "2024-03-18T06:18:40Z",
                "updated_at": "2024-03-20T15:53:52Z",
                "alt_description": "a tiger that is standing in some water",
                "urls": {
                    "raw": "https://images.unsplash.com/photo-1710742709244-b12ce26b5fb4?ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3",
                    "full": "https://images.unsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=85",
                    "regular": "https://images.unsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080",
                    "small": "https://images.unsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=400",
                    "thumb": "https://images.unsplash.com/photo-1710742709244-b12ce26b5fb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwxfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=200",
                    "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1710742709244-b12ce26b5fb4"
                },
            },
            {
                "id": "SU2BblqnwAI",
                "created_at": "2024-03-17T14:49:30Z",
                "updated_at": "2024-03-20T11:30:15Z",
                "alt_description": "a close up of a tiger sticking its tongue out",
                "breadcrumbs": [],
                "urls": {
                    "raw": "https://images.unsplash.com/photo-1710686896903-21b5438ef65d?ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwyfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3",
                    "full": "https://images.unsplash.com/photo-1710686896903-21b5438ef65d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwyfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=85",
                    "regular": "https://images.unsplash.com/photo-1710686896903-21b5438ef65d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwyfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080",
                    "small": "https://images.unsplash.com/photo-1710686896903-21b5438ef65d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwyfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=400",
                    "thumb": "https://images.unsplash.com/photo-1710686896903-21b5438ef65d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwyfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=200",
                    "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1710686896903-21b5438ef65d"
                }
            },
            {
                "id": "co9JPg-ab_c",
                "created_at": "2024-03-17T03:37:09Z",
                "updated_at": "2024-03-20T03:01:49Z",
                "alt_description": "a close up of a tiger with its mouth open",
                "breadcrumbs": [],
                "urls": {
                    "raw": "https://images.unsplash.com/photo-1710646446617-a6f73e2db699?ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwzfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3",
                    "full": "https://images.unsplash.com/photo-1710646446617-a6f73e2db699?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwzfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=85",
                    "regular": "https://images.unsplash.com/photo-1710646446617-a6f73e2db699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwzfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=1080",
                    "small": "https://images.unsplash.com/photo-1710646446617-a6f73e2db699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwzfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=400",
                    "thumb": "https://images.unsplash.com/photo-1710646446617-a6f73e2db699?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODA4ODZ8MHwxfHNlYXJjaHwzfHx0aWdlcnxlbnwwfHwyfHwxNzEwOTg5MzkyfDA&ixlib=rb-4.0.3&q=80&w=200",
                    "small_s3": "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1710646446617-a6f73e2db699"
                }
            }
        ]
    },
    "resultNumber": 3,
}

const unsplashApiReject = {
    "Status": "Success",
    "data": {
        "total": 0,
        "total_pages": 0,
        "results": []
    },
    "resultNumber": 0,
}

jest.mock('axios', () => {
    return {
        create: jest.fn().mockReturnValue({
            interceptors: {
                request: { use: jest.fn(), eject: jest.fn() },
                response: { use: jest.fn(), eject: jest.fn() },
            },
            get: jest.fn()
                .mockReturnValueOnce({ ...unsplashApiResponse })
                .mockReturnValueOnce({ ...unsplashApiReject })
                .mockReturnValueOnce({ ...unsplashApiReject }),
        }),
    };
});

describe('unsplashApiTest', () => {

    test('Should return a valid unsplash search object', async () => {
        const payload = {
            page: 1,
            perPage: 3,
            orderBy: 'latest',
            query: 'tiger'
        }
        const images = await searchImage(payload);
        expect(unsplashApiResponse).toEqual(images);
    });

    test('Should return no data if no query is given', async () => {
        const payload = {
            page: 1,
            perPage: 3,
            orderBy: 'latest',
            query: ''
        }
        const images = await searchImage(payload);
        expect(unsplashApiReject).toEqual(images);
    });
    test('Should return no data if no parameters are given', async () => {
        const payload = {

        }
        const images = await searchImage(payload);
        expect(unsplashApiReject).toEqual(images);
    });

});