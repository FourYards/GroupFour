const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const Listing = db.Listing;
const { loginRequiredApi } = require('../../middleware/auth');

/* GET one or many listings. */
router.get('/', async (req, res, next) => {
  let data = null;

  if (req.query.id) {
    // Get the listing by its id in the database
    data = await Listing.findOne({
      where: {
        id: req.query.id,
      },
      attributes: ['id', 'title', 'description', 'lengthInMinutes'],
      include: [
        { model: db.UserAccount, as: 'creator', attributes: ['realName'] },
        {
          model: db.TypeOfWork,
          as: 'typeDetails',
          attributes: ['description'],
        },
        {
          model: db.WorkStatus,
          as: 'workStatusDetails',
          attributes: ['description'],
        },
      ],
    });
  } else if (req.query.creator) {
    // Get all listing created by a user
    data = {
      data: await Listing.findAll({
        where: {
          UserAccountId: req.query.creator,
        },
      }),
    };
  } else {
    // Get recent listings
    data = {
      data: await Listing.findAll({
        attributes: ['id', 'description', 'title'],
        where: {
          status: 1,
        },
        include: [
          { model: db.UserAccount, as: 'creator', attributes: ['realName'] },
          {
            model: db.TypeOfWork,
            as: 'typeDetails',
            attributes: ['id', 'description'],
          },
        ],
      }),
    };
  }

  if (data) {
    res.json(data);
  } else {
    res.status(400);
  }
});

/** GET all listings needed for the myjobs page
 * Returns the logged in users posted listings, and listings that they have bid on
 * Each listing should include: id, title, desc, type, status, poster,
 * response.body = {
 * posted: [],
 * bid: [],
 * }
 *
 */
router.get('/myjobs', loginRequiredApi, async (req, res, next) => {
  let data = {
    posted: null,
    bid: null,
  };

  // Get users listings
  data.posted = await Listing.findAll({
    where: {
      creatorId: req.user.id,
    },
    attributes: ['id', 'title', 'description'],
    include: [
      { model: db.UserAccount, as: 'creator', attributes: ['id', 'realName'] },
      { model: db.TypeOfWork, as: 'typeDetails', attributes: ['description'] },
      {
        model: db.WorkStatus,
        as: 'workStatusDetails',
        attributes: ['description'],
      },
    ],
  });

  // Get users bid-on listings
  data.bid = await db.Bid.findAll({
    where: {
      bidderId: req.user.id,
    },
    attributes: ['id'],
    include: [
      {
        model: Listing,
        as: 'listing',
        attributes: ['id', 'title', 'description'],
        include: [
          {
            model: db.UserAccount,
            as: 'creator',
            attributes: ['id', 'realName'],
          },
          {
            model: db.TypeOfWork,
            as: 'typeDetails',
            attributes: ['description'],
          },
          {
            model: db.WorkStatus,
            as: 'workStatusDetails',
            attributes: ['description'],
          },
        ],
      },
    ],
  });

  data.bid.forEach((current, i) => {
    data.bid[i] = current.listing;
  });

  res.json(data);
});

/* POST a new listing. */
router.post('/', loginRequiredApi, async (req, res, next) => {
  if (
    req.body.title &&
    req.body.type &&
    req.body.lengthinMinutes &&
    req.body.description &&
    req.body.streetAddress &&
    req.body.city &&
    req.body.zipCode &&
    req.body.state
  ) {
    // Validate type of work and length in minutes values
    if (
      (await db.TypeOfWork.findByPk(req.body.type)) &&
      req.body.lengthinMinutes > 0
    ) {
      // Create new location if needed
      const [location, locCreated] = await db.Location.findOrCreate({
        where: {
          ownerId: req.user.id,
          streetAddress: req.body.streetAddress,
          city: req.body.city,
          zipCode: req.body.zipCode,
          state: req.body.state,
        },
      });

      if (locCreated) {
        console.log('New Location Added');
      }

      // Add new listing to database
      Listing.create({
        creatorId: req.user.id,
        placeId: location.id,
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        lengthInMinutes: req.body.lengthinMinutes,
      });

      res.send('Post Created Successfully.');
    } else {
      res.status(400).send('Failed to create Listing');
    }
  } else {
    res.status(400).send('Missing Required Fields');
  }
});

/* PATCH to mark a listing as complete */
router.patch(
  '/complete/:listingId',
  loginRequiredApi,
  async (req, res, next) => {
    const list = Listing.findOne({
      where: {
        id: req.params.listingId,
      },
      include: ['creator', 'workStatusDetails'],
    });

    if (!list) {
      return res.status(400).send('Not a real listing');
    }

    if (list.creator.id != req.user.id) {
      return res.status(401).send('This is not your listing');
    }

    if (
      (list.creator.id == req.user.id || req.user.role == 'ADM') &&
      list.workStatusDetials.description == 'In Progress'
    ) {
      // Change status
      list.setDataValue('status', 3);
      await list.save();

      // Move balance
      const bid = db.Bid.findOne({
        where: {
          accepted: true,
          listingId: list.id,
        },
        include: ['bidder'],
      });

      if (!bid) {
        console.log('LISTING COMPLETE WITH NO BID SELECTED');
        return res.status(500).send('Internal Server Error');
      }

      const amount = bid.amount;
      list.creator.setDataValue('balance', list.creator.balance - amount);
      bid.bidder.balance.setDataValue('balance', bid.bidder.balance + amount);

      res.status(204).send('Listing Successfully Completed');
    }

    // TODO update the status of the listing
    res.status(500);
  }
);

/* DELETE a listing. */
router.delete('/', async (req, res, next) => {
  try {
    if (req.isUnauthenticated()) {
      res.status(401);
    } else if (req.body.id) {
      const listing = await Listing.findByPk(req.body.id);
      if (listing.UserAccountId == req.user.id || req.user.role == 'ADM') {
        await listing.destroy();
        res.status(204).send();
      } else {
        res.json(403);
      }
    } else {
      res.status(400).send();
    }
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
