const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This URL will be used to update funds for a user's account.");
})

module.exports = router