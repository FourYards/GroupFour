const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const Bid = db.Bid;

/* GET one or many bids. */
router.get('/', async (req, res, next) => {
  if (req.query.id) {
    // retreive bid from db by its id
    const data = await Bid.findByPk(req.query.id);
    res.json(data);
  } else if (req.query.order) {
    // retreive bids from db by the order it is associated with
    const data = await Bid.findAll({
      where: {
        order: req.query.order,
      },
    });
    res.json(data);
  } else if (req.query.bidder) {
    // retreive bids from db by the person who made the bid, select only bids of orders that havent been completed
    const data = await Bid.findAll({
      where: {
        bidder: req.query.bidder,
      },
    });
    res.json(data);
  } else {
    res.status(400).json({ err: 'Bad Request' });
  }
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
