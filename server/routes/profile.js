const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.locals.clientContext.profile = true;
  res.render('vueComponent', {
    title: 'Profile',
    pageScripts: 'profile',
  });
});

module.exports = router;
