const axios = require('axios');
const { UNSPLASH_API_ACCESS_KEY, UNSPLASH_API_URL } = require('../../settings');

const unsplashClient = axios.create({
    baseURL: UNSPLASH_API_URL,
    headers: {
        Authorization: `Client-ID ${UNSPLASH_API_ACCESS_KEY}`
    }
})

const buildUnsplashQuery = ({
    query, perPage, page, orderBy, search
}) => {

    const url = `${search}?query=${query}&page=${page}&per_page=${perPage}&order_by=${orderBy}`
    return url;
}

const searchImage = async ({ page, perPage, orderBy, query }) => {
    console.log('Searching image ');
    const request = buildUnsplashQuery({ page, perPage, orderBy, query, search: '/search/photos' })
    const response = await unsplashClient.get(request);
    return { Status: "Success", data: response.data, resultNumber: response.data.results.length };
}

module.exports = { searchImage }
