const express = require('express');
const router = express.Router();

/* GET user balance. */
router.get('/', (req, res, next) => {
  const mockBalance = {
    balance: 100,
  };
  // TODO validate user is authentic

  // TODO get the users balance from the database model
  const data = mockBalance;
  // Send the information back to the client
  res.json(data);
});

/* PUT funds into or out of user's account */
router.put('/', (req, res, next) => {
  // TODO get the right user balance in the database and update it
  let err = null;
  if (err) {
    res.status(200).json({ err: err });
  }
  res.status(204).send();
});

module.exports = router;
