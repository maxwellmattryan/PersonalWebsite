const express = require('express');
const router = express.Router();

const ProfileService = require('../services/profile.service');

router.get('/', async (req, res, next) => {
    return ProfileService.get()
        .then((profile) => {
            res.json(profile);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;