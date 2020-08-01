const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log('Retrieving active profile...\n');

    res.send('Welcome to the API!');
});

module.exports = router;