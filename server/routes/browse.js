const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'This is the page that will show all the listings.',
  });
});

module.exports = router;
