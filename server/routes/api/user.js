const express = require('express');
const router = express.Router();
const db = require('../../db/models');

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
  for (let key of Object.keys(req.body)) {
    if (
      typeof req.user.get(key) !== 'undefined' &&
      key != 'passwordHash' &&
      key != 'id' &&
      key != 'role' &&
      key != 'balance'
    ) {
      // TODO conver req.user to a db object
      req.user.set(key, req.body[key]);
      changed = true;
    }
  }

  if (changed) {
    req.user.save();
    res.status(204);
  } else {
    res.status(400);
  }

  res.send();
});

router.get('/', async (req, res, next) => {
  let ret = {};
  if (req.query.userId) {
    ret = await db.UserAccount.findOne({
      where: {
        id: req.query.userId,
      },
      attributes: ['id', 'emailAddress', 'realName', 'phoneNumber'],
    });
  } else {
    for (let key of Object.keys(req.user.dataValues)) {
      if (
        typeof req.user.get(key) !== 'undefined' &&
        key != 'passwordHash' &&
        key != 'id'
      ) {
        ret[key] = req.user.get(key);
      }
    }
  }

  res.send(ret);
});

module.exports = router;
