const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const UserAccount = db.UserAccount;

/* PATCH the user settings 
req format:
{
  model-value: new-value
}
Locked values:
* passwordHash
*/
router.patch('/', async (req, res, next) => {
  let changed = false;
  const user = UserAccount.findByPk(req.user.id);
  for (let key of Object.keys(req.body)) {
    if (
      Object.key(user.dataValues).contains(key) &&
      key != 'passwordHash' &&
      key != 'id'
    ) {
      // TODO conver req.user to a db object
      user.dataValues[key] = req.body[key];
      changed = true;
    }
  }

  if (changed) {
    res.status(204);
  } else {
    res.status(400);
  }
});

module.exports = router;
