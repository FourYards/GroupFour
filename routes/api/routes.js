const express = require('express');
const router = express.Router();

const getRouter = require('./get/routes');

router.use('/get', getRouter);


module.exports = router