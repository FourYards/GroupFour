const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send("This is the user's profile page.");
})

module.exports = router