const express = require('express');
const router = express.Router();

const providerRouter = require('./provider');
const jobRouter = require('./job');

router.use('/provider', providerRouter);
router.use('/job', jobRouter);

module.exports = router