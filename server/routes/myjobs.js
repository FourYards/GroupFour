const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('vueComponent', {
    title: 'My Jobs',
    pageScripts: 'myjobs',
  });
});

module.exports = router;
