const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const Listing = db.Listing;

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
      data: await Listing.findAll(),
    };
  }

  if (data) {
    res.json(data);
  } else {
    res.status(400);
  }
});

/* POST a new listing. */
router.post('/', async (req, res, next) => {
  // Ensure user is authentic
  if (req.user.isUnauthenticated()) {
    res.status(401);
  } else if (
    req.body.typeofwork &&
    req.body.lengthinMinutes &&
    req.body.description &&
    req.body.streetAddress &&
    req.body.city &&
    req.body.zipCode &&
    req.body.state
  ) {
    // Validate type of work and length in minutes values
    if (
      (await db.TypeOfWork.findByPk(req.body.typeofwork)) &&
      req.body.lengthinMinutes > 0
    ) {
      // Create new location if needed
      let location = await db.Location.findOne({
        where: {
          UserAccountId: req.user.id,
          streetAddress: req.body.streetAddress,
          city: req.body.city,
          zipCode: req.body.zipCode,
          USStateId: req.body.state,
        },
      });

      if (!location) {
        location = await db.Location.create({
          UserAccountId: req.user.id,
          streetAddress: req.body.streetAddress,
          city: req.body.city,
          zipCode: req.body.zipCode,
          USStateId: req.body.state,
        });
      }

      // Add new listing to database
      Listing.create({
        UserAccountId: req.user.id,
        LocationId: location.id,
        TypeOfWorkId: req.body.typeofwork,
        description: req.body.description,
        lengthInMinutes: req.body.lengthinMinutes,
        WorkStatusId: 1,
      });

      res.send('Post Created Successfully.');
    } else {
      res.status(400);
    }
  } else {
    res.status(400);
  }
});

/* PATCH the status of a listing */
router.patch('/', async (req, res, next) => {
  // Validate user
  if (!req.user.isAuthenticated) {
    return res.status(401);
  }

  // Validate Request body
  if (!req.body.id) {
    return res.status(400);
  }

  // Get the listing to update
  const list = Listing.findByPk();

  if (list && list.UserAccountId == req.user.id) {
    // Update the status of the listing
    let stat = await list.getWorkStatus();
    if (stat.description == 'Completed') {
      return req.status(204);
    }

    list.setWorkStatus(list.WorkStatusId + 1);
    await list.save();
    res.status(204);
  } else {
    return res.status(401);
  }

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
