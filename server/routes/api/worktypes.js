const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.get('/', async (req, res, next) => {
  const types = await db.TypeOfWork.findAll();
  let data = [];
  if (types) {
    for (let type of types) {
      data.push({ value: type.id, text: type.description });
    }
    res.type('application/json');
    res.json(data);
  } else {
    res.status(400);
  }
});

module.exports = router;
