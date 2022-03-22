const express = require('express');
const router = express.Router();

/* GET one or many bids. */
router.get('/', (req, res, next) => {
  const mockData = {
    data: [
      {
        id: req.query.id,
        bidder_id: 1,
        amount: 100.0,
        order_id: 1,
      },
    ],
  };

  if (req.query.id) {
    // TODO retreive bid from db by its id
    const data = mockData.data[0];
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
  res.status(400).json({ err: 'Bad Request' });
});

/* POST a new bid. */
router.post('/', (req, res, next) => {
  // TODO check for authentic user

  if (req.body.bidder_id && req.body.amount && req.body.order_id) {
    // TODO input a new bid into the database
  } else {
    // Bad request
    res.status(400).json({ err: 'Bad Request' });
  }
});

/* DELETE a bid. */
router.delete('/', (req, res, next) => {
  // TODO check for authentic user

  if (req.body.id) {
    // TODO delete the bid from the database

    res.json({ message: 'Bid deleted' });
  } else {
    res.status(400).json({ err: 'Bad Request' });
  }
});

module.exports = router;
