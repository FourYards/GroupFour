const express = require('express');
const router = express.Router();

const createRouter = require('./create')
const viewRouter = require('./view')
const bidRouter = require('./bid')

router.use('/create', createRouter)
router.use('/view', viewRouter)
router.use('/bid', bidRouter)

module.exports = router