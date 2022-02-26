const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This URL is to be used to delete an existing bid.");
})

module.exports = router