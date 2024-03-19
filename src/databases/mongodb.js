const { connect, connection } = require('mongoose');
const { DB_URI } = require('../../settings')
const mongo = async () => {
    connect(DB_URI).then(res => {
        console.log('Db connected successfully');
    }).catch(err => {
        console.log('Error occured while connecting to db: ', err.message);
    })

    const dbConnection = connection

    dbConnection.once("open", (_) => {
        console.log(`Database connected`);
    });

    dbConnection.on("error", (err) => {
        console.error(`Connection error: ${err}`);
    });
}

module.exports = { mongo }