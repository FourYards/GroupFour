const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // How do we want to let this page know just what job it is reviewing? Get params?
    res.send("This is the page that will allow a user to review a job they completed.");
})

module.exports = router