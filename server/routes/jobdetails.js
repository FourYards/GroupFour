const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('vueComponent', {
    title: 'Job Details',
    pageScripts: 'jobdetails',
  });
});

module.exports = router;
