const express = require('express');
const router = express.Router();
const db = require('../../db/models');

/* GET user balance. Returns balance of logged-in user in cents
response = {
  balance: *user balance in cents*
}
*/
router.get('/', async (req, res, next) => {
  // TODO validate user is authentic

  // TODO get the users balance from the database model
  const user = await db.UserAccount.findByPk(req.user.id);
  const data = user.balance;
  // Send the information back to the client
  if (data) {
    res.json({ balance: data });
  } else {
    res.json({ balance: 0 });
  }
});

/* PATCH an account to have a different amount of funds 
  INPUT FUNDS AMOUNT SHOULD BE IN CENTS
  Request format:
  {
    balance: *integer amount of cents*
  }
*/
router.patch('/', async (req, res, next) => {
  // TODO validate user is authentic

  // Validate balance input
  if (req.body.balance && !isNaN(req.body.balance) && req.body.balance >= 0) {
    const user = await db.UserAccount.findByPk(req.user.id);
    user.balance = parseInt(req.body.balance);
    await user.save();
    res.status(204);
  } else res.status(400);
});

module.exports = router;
