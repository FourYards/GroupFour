const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('This is the page that will show all the listings.');
});

module.exports = router;
