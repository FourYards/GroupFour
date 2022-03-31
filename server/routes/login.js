const express = require('express');
const router = express.Router();
const {
  loginPageController,
  loginController,
  logoutController,
} = require('../controllers/login');

router.get('/login', loginPageController);
router.post('/login', loginController);
router.post('/logout', logoutController);

module.exports = router;
