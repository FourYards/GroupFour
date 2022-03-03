const express = require('express');
const router = express.Router();

/* GET one or many bids. */
router.get('/', (req, res, next) => {
  res.send('This URL will respond to GET, POST, and DELETE requests relating to bids.');
});

/* POST a new bid. */
router.post('/', (req, res, next) => {
  res.send('This endpoint will create a new bid on a listing.');
});

/* DELETE a bid. */
router.delete('/', (req, res, next) => {
  res.send('This endpoint will delete a bid on a listing.');
});


module.exports = router;
