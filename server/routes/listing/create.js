const express = require('express');
const router = express.Router();
const { loginRequiredPage } = require('../../middleware/auth');

router.get('/', loginRequiredPage, (req, res, next) => {
  res.render('vueComponent', {
    title: 'FourYards - Post a Listing',
    pageScripts: 'createListing',
  });
});

module.exports = router;
