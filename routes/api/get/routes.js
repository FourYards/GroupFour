const express = require('express');
const router = express.Router();

const listingsRouter = require('./listings');
const balanceRouter = require('./balance');

router.use('/listings', listingsRouter);
router.use('/balance', balanceRouter);

module.exports = router