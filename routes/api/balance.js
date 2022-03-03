const express = require('express');
const router = express.Router();

/* GET user balance. */
router.get('/', (req, res, next) => {
  res.send('This URL will respond to GET and PUT requests about the balance of the authorized user.');
});

/* PUT funds into or out of user's account */
router.put('/', (req, res, next) => {
  res.send('This endpoint will update the user\'s balance to add or remove funds.');
});

module.exports = router;
