const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send('This is the page that will show the user their listings and jobs.');
});

module.exports = router;
