const { mongo } = require('./mongodb');

const connectDb = (db) => {
    switch (db) {
        case 'mongodb':
            mongo()
            break;

        default:
            mongo()
            break;
    }
    return
}

module.exports = connectDb