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

/* POST a new bid. 
  Creates and posts a bid from whatever user is signed in
  format: 
  request.body = {
    amount: *value > 0*, // AMOUNT SHOULD BE IN CENTS
    order: *id of listing*,
  }
*/
router.post('/', loginRequiredApi, async (req, res, next) => {
  if (req.body.amount && req.body.order) {
    // Validate order is a real listing
    const order = await db.Listing.findByPk(req.body.order);
    if (!order) {
      res.status(400).send('Bad Request');
    }

    // Validate amount is a non-negative number
    if (isNaN(req.body.amount) || !req.body.amount > 0) {
      res.status(400).send('Bad Request');
    }

    // Input a new bid into the database
    const bid = await Bid.create({
      bidderId: req.user.id,
      amount: Math.trunc(req.body.amount),
      listingId: order.id,
    });

    if (bid) {
      res.send('Post Created Successfully.');
    } else {
      // bid was not created for some reason
      res.status(500).send('Unable to create bid.');
    }
  } else {
    // Bad request
    res.status(400).send('Bad Request');
  }
});

/* Accept a bid
  Tries to accept a bid if no other bids have been accepted
  endpoint: api/bid/accept/:bidId
*/
router.patch('/accept/:bidId', loginRequiredApi, async (req, res, next) => {
  const bid = await Bid.findOne({
    where: {
      id: req.params.bidId,
    },
    include: [
      {
        model: db.Listing,
        as: 'listing',
        include: [
          { model: db.UserAccount, as: 'creator' },
          { model: db.WorkStatus, as: 'workStatusDetails' },
        ],
      },
    ],
  });

  if (!bid) {
    return res.status(400).send('Bid does not exist');
  }

  if (req.user.id != bid.listing.creator.id) {
    return res.status(401).send('You are not the author of this listing');
  }

  if (bid.workStatusDetails.description === 'New') {
    // Set workstatus to in progress
    bid.listing.setDataValue('status', 2);
    await bid.listing.save();

    // Accept Bid
    bid.setDataValue('accepted', true);
    await bid.save();

    return res.status(204);
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
