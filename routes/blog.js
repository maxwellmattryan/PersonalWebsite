const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');
require('../config/passport')(passport);

const Profile = require('../models/profile');
const Post = require('../models/post');
const Topic = require('../models/topic');

// BLOG
router.get('/posts', (req, res, next) => {
    Post.find({})
    .populate('topics')
    .exec((err, posts) => {
        if(err) throw err;

        Topic.find({})
        .exec((err, topics) => {
            if(err) throw err;
            
            let blog = { posts: posts, topics: topics };
            res.status(200).json(blog);
        });
    });

});

// POSTS
router.get('/posts/:uri', (req, res, next) => {
    Post.findOne({uri: req.params.uri})
    .populate('topics')
    .exec((err, post) => {
        if(err) throw err;

        if(post) {
            res.status(200).json(post);
        } else {
            res.sendStatus(204);
        }
    });
});

router.put('/posts/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const postData = {
        _id:            req.body._id || new mongoose.Types.ObjectId(),
        uri:            req.body.uri,
        title:          req.body.title, 
        subtitle:       req.body.subtitle,
        topics:         req.body.topics,
        author:         req.body.author,
        description:    req.body.description,
        content:        req.body.content,
        imageURL:       req.body.imageURL,
        updated:        Date.now()
    };

    Post.updateOne({_id: postData._id}, postData, (err, result) => {
        if(err) throw err;

        if(result.nModified === 0) {
            const newPost = new Post({
                ...postData,
                created: Date.now()
            });

            newPost.save((err, post) => {
                if(err) {
                    res.status(200).json({
                        success: false,
                        msg: 'This post already exists.'
                    });
                } else {    
                    res.status(201).json({
                        success: true,
                        msg: 'Created new blog post!'
                    });
                }
            });
        } else {
            res.status(200).json({
                success: true,
                msg: 'Updated blog post!'
            });
        }
    });
});

router.delete('/posts/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Post.findOneAndDelete({uri: req.params.uri}, (err, post) => {
        if(err) throw err
        
        res.status(200).json({
            success: true,
            msg: 'Deleted blog post!'
        });
    });
});

// TOPICS
router.get('/topics', (req, res, next) => {
    Topic.find({}, (err, topics) => {
        if(err) {
            res.sendStatus(400);
        } else {
            res.status(200).json(topics);
        }
    });
});

router.put('/topics/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const topicData = {
        _id: req.body._id || new mongoose.Types.ObjectId(),
        uri: req.body.uri,
        name: req.body.name,
        description: req.body.description,
        imageURL: req.body.imageURL
    };

    Topic.updateOne({_id: topicData._id}, topicData, (err, result) => {
        if(err) throw err;

        if(result.n === 0) {
            const newTopic = new Topic(topicData);

            newTopic.save((err, topic) => {
                if(err) {
                    res.status(200).json({
                        success: false,
                        msg: 'Unable to create new blog topic.'
                    });
                } else {    
                    res.status(201).json({
                        success: true,
                        msg: 'Created new blog topic!'
                    });
                }
            });
        } else {
            res.status(201).json({
                success: true,
                msg: 'Updated blog topic!'
            });
        }
    });
});

router.delete('/topics/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Topic.findOneAndDelete({uri: req.params.uri}, (err, topic) => {
        if(err) throw err;

        Post.updateMany({}, {$pull: {topics: topic._id}}, (err, result) => {
            if(err) {
                console.log(err);
                res.status(200).json({
                    success: false,
                    msg: 'Unable to delete blog topic.'
                });
            } else {
                res.status(200).json({
                    success: true,
                    msg: 'Deleted blog topic!'
                });
            }
        });
    });
});

module.exports = router;