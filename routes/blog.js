const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');
require('../config/passport')(passport);

const Post = require('../models/post');
const Topic = require('../models/topic');

// BLOG
router.get('/posts', (req, res, next) => {
    Post.find({})
    .populate('topics')
    .exec((err, posts) => {
        if(err) throw err;

        res.status(200).json(posts);
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

    Post.updateOne({uri: req.params.uri}, postData, (err, result) => {
        if(err) throw err;

        if(result.n === 0) {
            const newPost = new Post({
                ...postData,
                _id: new mongoose.Types.ObjectId(),
                created: Date.now()
            });

            newPost.save((err, post) => {
                if(err) {
                    res.status(400).send('Unable to create blog post.');
                } else {    
                    res.status(201).send('Successfully created blog post.');
                }
            });
        } else {
            res.status(200).send('Successfully updated blog post.');
        }
    });
});

router.delete('/posts/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Post.deleteOne({uri: req.params.uri}, err => {
        if(err) res.status(400).send('Unable to delete blog posts');
        else res.status(200).send('Successfully deleted blog post.');
    });
});

// TOPICS
router.get('/topics', (req, res, next) => {
    Topic.find({}, (err, topics) => {
        if(err) throw err;

        res.status(200).json(topics);
    });
});

router.get('/topics/:uri', (req, res, next) => {
    Topic.findOne({uri: req.params.uri}, (err, topic) => {
        if(err) throw err;

        if(topic) {
            res.status(200).json(topic);
        } else {
            res.sendStatus(204);
        }
    });
});

router.put('/topics/:uri', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const topicData = {
        uri: req.body.uri,
        name: req.body.name,
        description: req.body.description,
        imageURL: req.body.imageURL
    };

    Topic.updateOne({uri: req.params.uri}, topicData, (err, result) => {
        if(err) throw err;

        if(result.n === 0) {
            const newTopic = new Topic({
                ...topicData,
                _id: new mongoose.Types.ObjectId()
            });

            newTopic.save((err, topic) => {
                if(err) {
                    res.status(400).send('Unable to create blog topic.');
                } else {
                    res.status(201).send('Successfully created blog topic.');
                }
            });
        } else {
            res.status(200).send('Successfully updated blog topic.');
        }
    });
});

module.exports = router;