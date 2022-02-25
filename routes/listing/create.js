const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This is the page that allows the user to create a listing.");
})

module.exports = router