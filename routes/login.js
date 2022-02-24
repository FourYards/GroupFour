const express = require('express');
const router = express.Router();

router.get('/login', function (req, res, next) {
    res.send("This is the login and create user page.");
})

module.exports = router