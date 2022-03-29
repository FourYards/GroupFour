const express = require('express');
const router = express.Router();
const {
  loginPageController,
  loginController,
  logoutController,
} = require('../controllers/login');

router.get('/', loginPageController);
router.post('/', loginController);
router.delete('/', logoutController);

module.exports = router;
