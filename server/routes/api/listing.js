const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const Listing = db.Listing;

/* GET one or many listings. */
router.get('/', async (req, res, next) => {
  if (req.query.id) {
    // TODO get the listing by its id in the database
    const data = await Listing.findByPk(req.query.id);
    if (data) {
      res.json(data);
    } else {
      res.status(400).json({ err: 'Bad Request' });
    }
  } else if (req.query.creator) {
    // TODO get all listings created by a certain user
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
    // TODO get a list of recent listings
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
router.post('/', (req, res, next) => {
  // TODO ensure user is authentic

  if (
    req.body.creator_id &&
    req.body.place_id &&
    req.body.typeofwork &&
    req.body.description &&
    req.body.workStatus &&
    req.body.return_address
  ) {
    // TODO add new listing to database

    // Redirect to the user to whatever page specified
    res.redirect(req.body.return_address);
  } else {
    res.status(400).json({ err: 'Bad Request' });
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
