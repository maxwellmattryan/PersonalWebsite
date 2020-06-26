const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');
require('../config/passport')(passport);

const Profile = require('../models/profile');

router.get('', (req, res, next) => {
    Profile.find({}, (err, profiles) => {
        if(err) throw err;

        res.status(200).json(profiles);
    });
});

router.put('/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Profile.updateMany({}, { active: false }, (err, profiles) => {
        if(err) throw err;

        const profileData = {
            _id:            req.body._id || new mongoose.Types.ObjectId(),
            uri:            req.body.uri,
            name:           req.body.name,
            active:         true,
            landing:        req.body.landing,
            about:          req.body.about,
            projects:       req.body.projects
        };
    
        Profile.updateOne({_id: profileData._id}, profileData, (err, result) => {
            if(err) throw err;

            if(result.n === 0) {
                const newProfile = new Profile(profileData);
                newProfile.save((err, profile) => {
                    if(err) {
                        res.status(400).json({
                            success: false,
                            msg: 'This profile already exists.'
                        });
                    } else {
                        res.status(201).json({
                            success: true,
                            msg: `Created and switched profile to ${profileData.uri.replace('-', ' ')}!`
                        });
                    }
                });
            } else if(result.nModified === 0) {
                res.sendStatus(304);
            } else {
                res.status(200).json({
                    success: true,
                    msg: `Switched profile to ${profileData.uri.replace('-', ' ')}!`
                });
            }
        });
    });
});

module.exports = router;