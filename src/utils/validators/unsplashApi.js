
const validPages = (pages) => {
    if (!pages) return 1;
    if (typeof pages === 'string') return parseInt(pages);
    return pages;
}

const validPerPages = (pages) => {
    if (!pages) return 5;
    if (typeof pages === 'string') return parseInt(pages);
    return pages;
}

const validOrderBy = (orderBy) => {

    const validOptions = ['relevant', 'latest'];

    if (!orderBy || orderBy === '' || orderBy === ' ') return 'latest';
    if (!validOptions.includes(orderBy)) return 'latest';

    return orderBy;
}

const validQuery = (query) => {
    if (!query) return ''
    return query
}

const paramsValidator = ({ page, perPage, orderBy, query }) => {
    console.log('Validating unplash api params');

    const params = {
        page: validPages(page),
        perPage: validPerPages(perPage),
        orderBy: validOrderBy(orderBy),
        query: validQuery(query)
    };

    return params;
}

module.exports = {
    paramsValidator
};