const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const profileRouter = require('./profile');
const settingsRouter = require('./settings');

router.use('/', userRouter);
router.use('/profile', profileRouter);
router.use('/settings', settingsRouter);

module.exports = router;
