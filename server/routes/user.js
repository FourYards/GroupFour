const express = require('express');
const router = express.Router();

router.get('/:UserId', (req, res, next) => {
  // Tell the client that it is looking at someone else's profile
  res.locals.clientContext.userId = req.params.UserId;
  res.render('vueComponent', {
    title: 'FourYards',
    pageScripts: 'profile',
  });
});

module.exports = router;
