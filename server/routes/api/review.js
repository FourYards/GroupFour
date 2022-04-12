const express = require('express');
const router = express.Router();
const db = require('../../db/models');

/*
    Function to post a review to the database
    Provider Review FORMAT:
    body = {
        providerId: *id*,
        comment: *string comment*,
        rating: *number [1,5]*
    }
    
    Listing Review FORMAT:
    body = {
        listingId: *id*,
        comment: *string comment*,
        rating: *number [1,5]*
    }
*/
router.post('/', async (req, res, next) => {
  // Authenticate user
  if (req.user.isUnauthenticated) {
    return res.status(401);
  }

  if (
    !req.body.comment ||
    !req.body.rating ||
    isNaN(req.body.rating) ||
    req.body.rating > 5 ||
    req.body.rating < 0
  ) {
    return res.status(400);
  }

  if (req.body.providerId) {
    // Add review to a provider
    let rev = await db.Review.create({
      comment: req.body.comment,
      rating: req.body.rating,
      UserAccountId: req.body.providerId,
    });
    if (rev) {
      return res.status(204);
    } else {
      return res.status(500);
    }
  } else if (req.body.listingId) {
    // Add review to a listing
    let rev = await db.Review.create({
      comment: req.body.comment,
      rating: req.body.rating,
      ListingId: req.body.listingId,
    });

    if (rev) {
      return res.status(204);
    } else {
      return res.status(500);
    }
  } else {
    return res.status(400);
  }
});

module.exports = router;
