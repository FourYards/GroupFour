const express = require('express');
const router = express.Router();

const bidRouter = require('./bid');
const balanceRouter = require('./balance');
const listingRouter = require('./listing');
const userRouter = require('./user');
const addFundsRouter = require('./addFunds');

router.use('/bid', bidRouter);
router.use('/balance', balanceRouter);
router.use('/listing', listingRouter);
router.use('/user', userRouter);
router.use('/addfunds', addFundsRouter);

module.exports = router;
