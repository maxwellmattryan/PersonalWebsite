const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');

const passport = require('passport');
require('../config/passport')(passport);

const Post = require('../models/post');
const Topic = require('../models/topic');

// BLOG
router.get('/posts', (req, res, next) => {
    Post.find({}, (err, posts) => {
        if(err) throw err;

        res.json(posts);
    });
});

// POSTS
router.get('/posts/:uri', (req, res, next) => {
    Post.findOne({title: req.params.title}, (err, post) => {
        if(err) throw err;

        res.json(post);
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
    console.log(req);
});

// TOPICS
router.get('/topics', (req, res, next) => {
    Topic.find({}, (err, topics) => {
        if(err) throw err;

        res.json(topics);
    });
});

router.get('/topics/:name', (req, res, next) => {
    Topic.findOne({name: req.params.name}, (err, topic) => {
        if(err) throw err;

        res.json(topic);
    });
});

router.put('/topics/:name', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    // TODO: change functionality to actually update if it exists / create if not
    const newTopic = new Topic({
        _id:            new mongoose.Types.ObjectId(),
        name:           req.body.name,
        description:    req.body.description,
        imageUrl:       req.body.imageUrl
    });

    newTopic.save()
    .then(data => res.status(200).send(JSON.stringify(data)))
    .catch(err => { console.log(err); res.status(400).send(JSON.stringify(err)); });
});

router.delete('/topics/:name', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    console.log(req);
});

module.exports = router;