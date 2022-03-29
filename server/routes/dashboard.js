const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('vueComponent', {
    title: 'FourYards',
    pageScripts: 'dashboard',
  });
});

module.exports = router;
