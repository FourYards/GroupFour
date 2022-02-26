var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('This URL will respond to GET and PUT requests about the balance of the authorized user.');
});

module.exports = router;
