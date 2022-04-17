const express = require('express');
const router = express.Router();

router.get('/:UserId', (req, res, next) => {
  res.render('addReview', {
    title: 'Add Review',
    targetUser: req.params.UserId,
    pageScripts: 'addReview',
  });
});

module.exports = router;
