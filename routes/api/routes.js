const express = require('express');
const router = express.Router();

const getRouter = require('./get/routes');
const putRouter = require('./put/routes');
const postRouter = require('./post/routes');

router.use('/get', getRouter);
router.use('/put', putRouter);
router.use('/post', postRouter);


module.exports = router