const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.send("This response is a json object of all requested listings");
})

module.exports = router