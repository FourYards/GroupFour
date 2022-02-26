var express = require('express');
var router = express.Router();

const bidRouter = require('./bid');
const balanceRouter = require('./balance');
const listingRouter = require('./listing');

router.use('/bid', bidRouter);
router.use('/balance', balanceRouter);
router.use('/listing', listingRouter);

module.exports = router;
