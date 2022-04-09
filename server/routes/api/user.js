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
  let changed = false;
  const user = req.user; // UserAccount.findByPk(req.user.id);
  for (let key of Object.keys(req.body)) {
    if (
      typeof user.get(key) !== 'undefined' &&
      key != 'passwordHash' &&
      key != 'id'
    ) {
      // TODO conver req.user to a db object
      console.log('.');
      user.set(key, req.body[key]);
      console.log(',');
      changed = true;
    }
  }

  if (changed) {
    user.save();
    console.log(';');
    res.status(204);
  } else {
    res.status(400);
  }

  res.send();
});

module.exports = router;
