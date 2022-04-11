const express = require('express');
const router = express.Router();

const bidRouter = require('./bid');
const balanceRouter = require('./balance');
const listingRouter = require('./listing');
const userRouter = require('./user');
const stateRouter = require('./states');
const workTypeRouter = require('./worktypes');

router.use('/bid', bidRouter);
router.use('/balance', balanceRouter);
router.use('/listing', listingRouter);
router.use('/user', userRouter);
router.use('/states', stateRouter);
router.use('/worktypes', workTypeRouter);

module.exports = router;
