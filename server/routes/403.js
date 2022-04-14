const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('403', { title: 'Access Denied!' });
});

module.exports = router;
