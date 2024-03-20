

const formatPerPage = (perPage) => {
    if (!perPage) return 5;
    if (typeof perPage !== 'integer') return parseInt(perPage);
    return perPage;
}

const formatPage = (page, perPage) => {
    let newPage = page;
    if (!newPage) return 0;
    if (typeof newPage !== 'integer') newPage = parseInt(newPage) - 1;
    if (newPage < 0) newPage = 0;
    return newPage * perPage;
}

const searchImageFilters = ({ page, perPage }) => {
    const newPerPage = formatPerPage(perPage);
    const newPage = formatPage(page, newPerPage);
    return { newPage, newPerPage };
}

module.exports = {
    searchImageFilters,
    formatPerPage,
    formatPage
};