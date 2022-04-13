const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.get('/', async (req, res, next) => {
  const data = await db.USState.findAll();
  res.type('application/json');
  res.json(data);
});

module.exports = router;
