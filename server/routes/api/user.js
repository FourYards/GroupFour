const express = require('express');
const router = express.Router();
const db = require('../../db/models');
const UserAccount = db.UserAccount;

/* Function to update user settings 
req format:
{
  model-value: new-value
}
Locked values:
* passwordHash
*/
router.patch('/', async (req, res, next) => {
  let changed = false;
  for (let key of Object.keys(req.body)) {
    if (Object.key(UserAccount).contains(key) && key != 'passwordHash') {
      // TODO conver req.user to a db object
      const user = UserAccount.findByPk(req.user.id);
      user[key] = req.body[key];
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
