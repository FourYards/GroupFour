const express = require('express');
const router = express.Router();

router.get('/:listingID', (req, res, next) => {
  res.send(
    `This is the page that will show info on listing #${req.params['listingID']}.`
  );
});

module.exports = router;
