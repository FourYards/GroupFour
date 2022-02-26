const express = require('express');
const router = express.Router();


const bidRouter = require('./bid');
const listingRouter = require('./listing');

router.use('/bid', bidRouter);
router.use('/listing', listingRouter);


module.exports = router