var express = require('express');
var router = express.Router();

/* GET one or many listings. */
router.get('/', (req, res, next) => {
  res.send('This URL will respond to GET, POST, PUT, and DELETE requests regarding listings.');
});

/* POST a new listing. */
router.post('/', (req, res, next) => {
  res.send('This endpoint will create a new listing.');
});

/* PUT new info on a listing. */
router.put('/', (req, res, next) => {
  res.send('This endpoint will be used to update the listing status.');
});

/* DELETE a listing. */
router.delete('/', (req, res, next) => {
  res.send('This endpoint will be used to delete listings.');
});


module.exports = router;
