var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('This URL will respond to GET, POST, PUT, and DELETE requests regarding listings.');
});

module.exports = router;
