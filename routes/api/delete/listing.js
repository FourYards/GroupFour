const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This URL is to be used delete an existing listing.");
})

module.exports = router