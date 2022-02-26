var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('This URL will respond to GET, POST, and DELETE requests relating to bids.');
});

module.exports = router;
