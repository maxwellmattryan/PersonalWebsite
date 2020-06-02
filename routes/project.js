const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');
require('../config/passport')(passport);

const Profile = require('../models/profile');
const Project = require('../models/project');

router.put('/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const projectData = {
        _id: req.body._id || new mongoose.Types.ObjectId(),
        profiles: req.body.profiles,
        uri: req.body.uri,
        title: req.body.title,
        subtitle: req.body.subtitle,
        description: req.body.description,
        imageURL: req.body.imageURL,
        updated: Date.now()
    };

    Profile.updateMany({}, {$pull: {projects: projectData._id}}, (err, result) => {
        if(err) throw err;
    });
    Profile.updateMany({_id: {$in: projectData.profiles}}, {$push: {projects: projectData._id}}, (err, result) => {
        if(err) throw err;
    });

    Project.updateOne({_id: projectData._id}, projectData, (err, result) => {
        if(err) throw err;

        if(result.nModified === 0) {
            const newProject = new Project({
                ...projectData,
                created: Date.now()
            });

            newProject.save((err, project) => {
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