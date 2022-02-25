const express = require('express');
const router = express.Router();

const getRouter = require('./get/routes');
const putRouter = require('./put/routes');

router.use('/get', getRouter);
router.use('/put', putRouter);


module.exports = router