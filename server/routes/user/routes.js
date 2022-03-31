const express = require('express');
const router = express.Router();

const profileRouter = require('./profile');
const settingsRouter = require('./settings');

const {
  signupPageController,
  signupNewUserController,
} = require('../../controllers/login');

router.use('/profile', profileRouter);
router.use('/settings', settingsRouter);
router.get('/newSignUp', signupPageController);
router.post('/newSignUp', signupNewUserController);

module.exports = router;
