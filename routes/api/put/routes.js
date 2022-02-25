const express = require('express');
const router = express.Router();


const offerRouter = require('./acceptOffer');
const fundsRouter = require('./funds');
const statusRouter = require('./orderStatus');

router.use('/offer', offerRouter);
router.use('/funds', fundsRouter);
router.use('/status', statusRouter);

module.exports = router