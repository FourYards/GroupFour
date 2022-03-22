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
  // TODO validate user is authentic
  // TODO get user account
  if (req.body.balance) {
    if (isNaN(req.body.balance) || req.body.balance < 0) {
      res
        .status(400)
        .json({ err: 'Bad Request', message: 'Improper balance value' });
    } else {
      // TODO update user balance
      res.status(204).send();
    }
  } else {
    res
      .status(400)
      .json({ err: 'Bad Request', message: 'Request needs a balance value' });
  }
});

module.exports = router;
