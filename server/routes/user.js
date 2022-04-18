const express = require('express');
const router = express.Router();

const {
  signupPageController,
  signupNewUserController,
} = require('../controllers/login');

router.get('/newSignUp', signupPageController);
router.post('/newSignUp', signupNewUserController);

router.get('/:UserId', (req, res, next) => {
  // Tell the client that it is looking at someone else's profile
  res.locals.clientContext.userId = req.params.UserId;
  res.render('vueComponent', {
    title: 'FourYards',
    pageScripts: 'profile',
  });
});

module.exports = router;
