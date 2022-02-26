const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This URL is to be used create a new listing.");
})

module.exports = router