const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("This URL will be used to change the status of an order when the job is marked done, completed or something like that.");
})

module.exports = router