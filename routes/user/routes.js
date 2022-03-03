const express = require('express');
const router = express.Router();

const profileRouter = require('./profile');
const settingsRouter = require('./settings');

router.use('/profile', profileRouter);
router.use('/settings', settingsRouter);

module.exports = router