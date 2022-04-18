const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const Review = db.Review;
const { loginRequiredApi } = require('../../middleware/auth');

/*
Function to handle get requests to:
domain/api/review?reviewId=reviewId
  * return a single review object with the rating, comment, and target account realName & Id
  response.body = {
    "id":1,
    "comment":"Very good job, the leaves were nowhere to be seen",
    "rating":5,
    "provider":{
      "realName":"Bob Test",
      "id":3
    }
  }

domain/api/review?providerId=providerId
  * return an array of reviews on a specific user including rating, and comment
  response.body = [
    {
      "id":2,
      "comment":"There were some patches of uncut grass at the edge",
      "rating":1
    },
    {"id":3,"comment":"good job","rating":4}
  ]
*/
router.get('/', async (req, res) => {
  let data = null;
  if (req.query.reviewId) {
    data = await Review.findOne({
      where: {
        id: req.query.reviewId,
      },
      attributes: ['id', 'comment', 'rating'],
      include: [
        {
          model: db.UserAccount,
          as: 'provider',
          attributes: ['realName', 'id'],
        },
      ],
    });
  } else if (req.query.providerId) {
    data = {
      data: await Review.findAll({
        where: {
          providerId: req.query.providerId,
        },
        attributes: ['id', 'comment', 'rating'],
        include: [
          {
            model: db.UserAccount,
            as: 'author',
            attributes: ['realName', 'id'],
          },
        ],
      }),
    };
  }

  if (data) {
    res.json(data);
  } else {
    res.status(400).send();
  }
});

/*
    Function to post a review to the database
    Review FORMAT:
    body = {
      targetId: *id of target*,
      comment: *string*,
      rating: *number [1,5]*
    }
*/
router.post('/', loginRequiredApi, async (req, res, next) => {
  if (
    !req.body.targetId ||
    isNaN(req.body.targetId) ||
    !req.body.comment ||
    !req.body.rating ||
    isNaN(req.body.rating) ||
    req.body.rating > 5 ||
    req.body.rating < 0
  ) {
    return res.status(400).send('Invalid data');
  }

  // Add review to a user
  let rev = await Review.create({
    comment: req.body.comment,
    rating: req.body.rating,
    authorId: req.user.id,
    providerId: req.body.targetId,
  });
  if (rev) {
    return res.status(204).send('Review Created Successfully');
  } else {
    return res.status(500).send('Something went wrong creating the Review.');
  }
});

module.exports = router;
