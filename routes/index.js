const express = require('express');
const router = express.Router();

const Profile = require('../models/profile');
const PROFILE_URI = 'software-engineering';

router.get('', (req, res, next) => {
    Profile.find({uri: PROFILE_URI})
    .populate('projects')
    .populate('posts')
    .exec((err, profile) => {
        if(err) throw err;

        res.status(200).json(profile);
    });
});

module.exports = router;