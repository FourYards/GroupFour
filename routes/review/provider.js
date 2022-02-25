const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // How do we want this page to get info on the subject being reviewed?
    res.send("This is the page that will allow you to submit a review for a provider.");
})

module.exports = router