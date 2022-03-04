const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send(
    'This URL will handle POST, PUT, and DELETE requests relating to user accounts.'
  );
});

/* POST a new User. */
router.post('/', (req, res, next) => {
  res.send('This endpoint will try to create a new user.');
});

/* PUT a new User. */
router.put('/', (req, res, next) => {
  res.send('This endpoint will update the users information.');
});

module.exports = router;
