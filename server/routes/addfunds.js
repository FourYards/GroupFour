const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('vueComponent', {
    title: 'Add Funds',
    pageScripts: 'addfunds',
  });
});

module.exports = router;
