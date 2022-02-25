const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This URL is to be used to update the accepted offer on a job listing.");
})

module.exports = router