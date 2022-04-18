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
            attributes: ['description'],
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

/* PATCH the status of a listing */
router.patch('/', async (req, res, next) => {
  // TODO validate user

  // TODO get the listing to update

  // TODO update the status of the listing
  res.status(500);
});

/* DELETE a listing. */
router.delete('/', (req, res, next) => {
  if (req.user.isUnauthenticated()) {
    res.status(401);
  } else if (req.body.id) {
    const listing = Listing.findByPk(req.body.id);
    if (listing.UserAccountId == req.user.id || req.user.role == 'ADM') {
      listing.destroy();
      res.status(204);
    } else {
      res.json(403);
    }
  } else {
    res.status(400);
  }
});

module.exports = router;
