const express = require('express');
const router = express.Router();

/* GET one or many listings. */
router.get('/', (req, res, next) => {
  const mockData = {
    data: [
      {
        id: 1,
        creator_id: 5,
        place_id: 3,
        typeofwork: 3,
        description: 'This listing is doing some listing',
        workStatus: 1,
      },
    ],
  };

  if (req.query.id) {
    // TODO get the listing by its id in the database
    const data = mockData;

    res.json(data);
  } else if (req.query.creator_id) {
    // TODO get all listings created by a certain user
    const data = mockData;

    res.json(data);
  } else {
    res.status(400).json({ err: 'Bad Request' });
  }
});

/* POST a new listing. */
router.post('/', (req, res, next) => {
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
  res.send('This endpoint will be used to update the listing status.');
});

/* DELETE a listing. */
router.delete('/', (req, res, next) => {
  res.send('This endpoint will be used to delete listings.');
});

module.exports = router;
