const express = require('express');
const router = express.Router();

/* PATCH the user settings 
req format:
{
  model-value: new-value
}
Locked values:
* passwordHash
*/
router.patch('/', async (req, res, next) => {
  if (
    'amount' in req.body &&
    typeof req.body.amount == 'number' &&
    req.body.amount > 0
  ) {
    let balance = req.user.get('balance');
    if (balance == null) {
      req.user.set('balance', req.body.amount);
    } else {
      req.user.set('balance', balance + req.body.amount);
    }
    req.user.save();
    res.status(204);
  } else {
    res.status(400);
  }

  res.send();
});

module.exports = router;
