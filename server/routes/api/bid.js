const express = require('express');
const router = express.Router();
const { loginRequiredApi } = require('../../middleware/auth');
const db = require('../../db/models');
const Bid = db.Bid;

/* GET one or many bids. 
  For each bid it will tell you:
    - The id of the bid
    - The amount bid
    - The id of the bidder
    - The name of the bidder
    - The id of the listing
    - The title of the listing

  Three different query types:

  GET Bid by ID
  * domain/api/bid?id=1
    response = {
      "id": 1,
      "amount": 3000,
      "bidder": {
        "id": 3,
        "realName": "Bob Test"
      },
      "listing": {
        "id": 1,
        "title": "Front Yard Leaves"
      }
    }

  GET Bids by Bidder
  * domain/api/bid?bidder=4
    response = {
      "data": [
        {
          "id": 2,
          "amount": 2500,
          "bidder": {
            "id": 4,
            "realName": "Carrot Cake"
          },
          "listing": {
            "id": 1,
            "title": "Front Yard Leaves"
          }
        },
        {
          "id": 4,
          "amount": 1750,
          "bidder": {
            "id": 4,
            "realName": "Carrot Cake"
          },
          "listing": {
            "id": 2,
            "title": "Weekly Lawn Mowing"
          }
        },
      ]
    }
  
  GET Bids by Order
  * domain/api/bid?order=1
    response = {
      "data": [
        {
          "id": 1,
          "amount": 3000,
          "bidder": {
            "id": 3,
            "realName": "Bob Test"
          },
          "listing": {
            "id": 1,
            "title": "Front Yard Leaves"
          }
        },
        {
          "id": 2,
          "amount": 2500,
          "bidder": {
            "id": 4,
            "realName": "Carrot Cake"
          },
          "listing": {
            "id": 1,
            "title": "Front Yard Leaves"
          }
        },
      ]
    }

*/
router.get('/', async (req, res, next) => {
  if (req.query.id) {
    // retreive bid from db by its id
    const data = await Bid.findOne({
      where: {
        id: req.query.id,
      },
      attributes: ['id', 'amount'],
      include: [
        { model: db.UserAccount, as: 'bidder', attributes: ['id', 'realName'] },
        { model: db.Listing, as: 'listing', attributes: ['id', 'title'] },
      ],
    });
    res.json(data);
  } else if (req.query.order) {
    // retreive bids from db by the order it is associated with
    const data = {
      data: await Bid.findAll({
        where: {
          listingId: req.query.order,
        },
        attributes: ['id', 'amount'],
        include: [
          {
            model: db.UserAccount,
            as: 'bidder',
            attributes: ['id', 'realName'],
          },
          { model: db.Listing, as: 'listing', attributes: ['id', 'title'] },
        ],
      }),
    };
    res.json(data);
  } else if (req.query.bidder) {
    // retreive bids from db by the person who made the bid, select only bids of orders that havent been completed
    const data = {
      data: await Bid.findAll({
        where: {
          bidder: req.query.bidder,
        },
        attributes: ['id', 'amount'],
        include: [
          {
            model: db.UserAccount,
            as: 'bidder',
            attributes: ['id', 'realName'],
          },
          { model: db.Listing, as: 'listing', attributes: ['id', 'title'] },
        ],
      }),
    };
    res.json(data);
  } else {
    res.status(400).send('Bad Request');
  }
});

/* POST a new bid. */
router.post('/', loginRequiredApi, async (req, res, next) => {
  if (req.body.bidder && req.body.amount && req.body.order && req.body.target) {
    // Validate bidder is a real account
    const bidder = await db.UserAccount.findByPk(req.body.bidder);
    if (!bidder) {
      return res.status(400).send('Bad Request');
    }

    // Validate order is a real listing
    const order = await db.Listing.findByPk(req.body.order);
    if (!order) {
      res.status(400).send('Bad Request');
    }

    // Validate amount is a non-negative number
    if (!req.body.amount > 0) {
      res.status(400).send('Bad Request');
    }

    // input a new bid into the database
    await Bid.create({
      bidderId: bidder.id,
      amount: req.body.amount,
      listingId: order.id,
    });

    res.send('Post Created Successfully.');
  } else {
    // Bad request
    res.status(400).send('Bad Request');
  }
});

/* DELETE a bid. */
router.delete('/', loginRequiredApi, async (req, res, next) => {
  if (req.body.id) {
    const target = Bid.findByPk(req.body.id);
    if (target && (req.user.role === 'ADM' || target.bidderId == req.user.id)) {
      await target.destroy();
      res.send('Bid deleted');
    } else {
      res.status(400).send('Invalid deletion target');
    }
  } else {
    res.status(400).send('Bad Request');
  }
});

module.exports = router;
