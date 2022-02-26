const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This URL is to be used to create a new bid on a listing.");
})

module.exports = router