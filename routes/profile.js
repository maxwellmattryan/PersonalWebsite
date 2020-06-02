const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');
require('../config/passport')(passport);

const Profile = require('../models/profile');

router.put('/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const profileData = {
        _id:            req.body._id || new mongoose.Types.ObjectId(),
        uri:            req.body.uri,
        name:           req.body.name,
        tagline:        req.body.tagline,
        about:          req.body.about,
        technologies:   req.body.technologies,
        projects:       req.body.projects,
        posts:          req.body.posts
    };

    Profile.updateOne({_id: profileData._id}, profileData, (err, result) => {
        if(err) throw err;

        if(result.nModified === 0) {
            const newProfile = new Profile(profileData);
            newProfile.save((err, profile) => {
                if(err) {
                    res.sendStatus(400);
                } else {
                    res.sendStatus(201);
                }
            });
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;