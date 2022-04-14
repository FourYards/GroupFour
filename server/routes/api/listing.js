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
    data = await Listing.findByPk(req.query.id);
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

/* POST a new listing. */
router.post('/', loginRequiredApi, async (req, res, next) => {
  if (
    req.body.typeofwork &&
    req.body.lengthinMinutes &&
    req.body.description &&
    req.body.target
  ) {
    // Validate type of work and length in minutes values
    if (
      (await db.TypeOfWork.findOne({
        where: {
          description: req.body.typeofwork,
        },
      })) &&
      req.body.lengthinMinutes > 0
    ) {
      // Validate location
      if (
        req.body.place.streetAddress &&
        req.body.place.city &&
        req.body.place.zipCode &&
        req.body.place.USStateId
      ) {
        res.status(400);
      }

      // Create new location if needed
      let location = await db.Location.findOne({
        where: {
          UserAccountId: req.user.id,
          streetAddress: req.body.place.streetAddress,
          city: req.body.place.city,
          zipCode: req.body.place.zipCode,
          USStateId: req.body.place.USStateId,
        },
      });

      if (!location) {
        location = await db.Location.create({
          UserAccountId: req.user.id,
          streetAddress: req.body.place.streetAddress,
          city: req.body.place.city,
          zipCode: req.body.place.zipCode,
          USStateId: req.body.place.USStateId,
        });
      }

      // Add new listing to database
      Listing.create({
        creator: req.user.id,
        place: location.id,
        typeofwork: req.body.typeofwork,
        description: req.body.description,
        lengthinMinutes: req.body.lengthinMinutes,
      });

      // Redirect to the user to whatever page specified
      res.redirect(req.body.target);
    } else {
      res.status(400);
    }
  } else {
    res.status(400);
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
