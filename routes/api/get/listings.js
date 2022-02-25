const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This response is a json object of all requested listings");
})

module.exports = router