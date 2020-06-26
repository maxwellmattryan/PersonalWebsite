const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Profile = require('../models/profile');

router.get('', (req, res, next) => {
    Post.find({})
    .populate('topics')
    .exec((err, posts) => {
        if(err) throw err;

        Profile.findOne({ active: true })
        .populate('projects')
        .exec((err, profile) => {
            if(err) throw err;

            let homepage = { posts: posts, profile: profile };
            res.status(200).json(homepage);
        });
    });
});

module.exports = router;