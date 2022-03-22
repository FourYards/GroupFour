const express = require('express');
const createError = require('http-errors');
const router = express.Router();

/* GET one or many bids. */
router.get('/', (req, res, next) => {
  const mockData = {
    data: [
      {
        id: req.query.id,
        bidder_id: 1,
        amount: 100.0,
        listing_id: 1,
      },
    ],
  };

  if (req.query.id) {
    // TODO retreive bid from db by its id
    const data = mockData;
    res.json(data);
  } else if (req.query.order_id) {
    // TODO retreive bids from db by the order it is associated with
    const data = mockData;
    res.json(data);
  } else if (req.query.bidder_id) {
    // TODO retreive bids from db by the person who made the bid, select only bids of orders that havent been completed
    const data = mockData;
    res.json(data);
  }
  next(createError(404));
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
