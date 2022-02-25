const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This response should return a json object of the logged in user's balance requiring authentication.");
})

module.exports = router