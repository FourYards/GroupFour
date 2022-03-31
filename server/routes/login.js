const express = require('express');
const router = express.Router();
const {
  loginPageController,
  loginController,
} = require('../controllers/login');

router.get('/', loginPageController);
router.post('/', loginController);

module.exports = router;
