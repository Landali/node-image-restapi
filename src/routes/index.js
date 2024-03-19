const Router = require('express');
const auth = require('./auth');
const images = require('./images');
const router = Router();

auth(router);
images(router);

module.exports = router;