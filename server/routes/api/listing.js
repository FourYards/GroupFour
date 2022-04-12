const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const Listing = db.Listing;
const { loginRequiredApi } = require('../../middleware/auth');

/* GET one or many listings. */
router.get('/', async (req, res, next) => {
  if (req.query.id) {
    // Get the listing by its id in the database
    const data = await Listing.findByPk(req.query.id);
    if (data) {
      res.json(data);
    } else {
      res.status(400).json({ err: 'Bad Request' });
    }
  } else if (req.query.creator) {
    // Get all listings created by a certain user
    const data = await Listing.findAll({
      where: {
        creator: req.query.creator,
      },
    });
    if (data) {
      res.json(data);
    } else {
      res.status(400).json({ err: 'Bad Request' });
    }
    res.json(data);
  } else {
    // Get a list of recent listings
    const data = await Listing.findAll({
      limit: 30,
      order: [['createdAt', 'DESC']],
    });
    if (data) {
      res.json(data);
    } else {
      res.status(400).json({ err: 'Bad Request' });
    }
    res.json(data);
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
    // Validate Listing can be created
    if (
      (await db.UserAccount.findByPk(req.body.creator)) &&
      (await db.TypeOfWork.findOne({
        where: {
          description: req.body.typeofwork,
        },
      }))
    ) {
      if (
        req.body.place.streetAddress &&
        req.body.place.city &&
        req.body.place.zipCode
      ) {
        res.status(400).json({
          err: 'Bad Request',
          msg: 'Inadequate place information in request',
        });
      }

      // Create new location if needed
      let location = await db.Location.findOne({
        where: {
          owner: req.body.creator,
          streetAddress: req.body.place.streetAddress,
          city: req.body.place.city,
          zipCode: req.body.place.zipCode,
        },
      });

      if (!location) {
        location = await db.Location.create({
          owner: req.body.creator,
          streetAddress: req.body.place.streetAddress,
          city: req.body.place.city,
          zipCode: req.body.place.zipCode,
        });
      }

      // Add new listing to database
      Listing.create({
        creator: req.body.creator,
        place: location.id,
        typeofwork: req.body.typeofwork,
        description: req.body.description,
        lengthinMinutes: req.body.lengthinMinutes,
      });

      // Redirect to the user to whatever page specified
      res.redirect(req.body.target);
    } else {
      res.status(400).send();
    }
  } else {
    res.status(400).send();
  }
});

/* PUT new info on a listing. */
router.put('/', (req, res, next) => {
  // TODO Ensure user is authentic

  if (req.body.id) {
    // TODO get listing from database
    if (req.body.description) {
      // TODO update the description of the listing
    }
    if (req.body.workStatus) {
      // TODO update the workstatus of the listing
    }
    // TODO save new info in db

    res.status(204).send();
  } else {
    res.status(400).json({ err: 'Bad Request' });
  }
});

/* DELETE a listing. */
router.delete('/', (req, res, next) => {
  // TODO ensure user is authentic
  if (req.body.id) {
    //TODO remove the listing from the db

    res.status(204).send();
  } else {
    res.status(400).json({ err: 'Bad Request' });
  }
});

module.exports = router;
