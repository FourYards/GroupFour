const express = require('express');
const router = express.Router();

const bidRouter = require('./bid');
const balanceRouter = require('./balance');
const listingRouter = require('./listing');
const userRouter = require('./user');
const stateRouter = require('./states');
const workTypeRouter = require('./worktypes');
const addFundsRouter = require('./addFunds');
const reviewRouter = require('./review');

router.use('/bid', bidRouter);
router.use('/balance', balanceRouter);
router.use('/listing', listingRouter);
router.use('/user', userRouter);
router.use('/states', stateRouter);
router.use('/worktypes', workTypeRouter);
router.use('/addfunds', addFundsRouter);
router.use('/review', reviewRouter);

module.exports = router;
