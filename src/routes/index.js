const Router = require('express');
const auth = require('./auth');
const images = require('./images');
const configs = require('./config');

const router = Router();

auth(router);
images(router);
configs(router);

module.exports = router;