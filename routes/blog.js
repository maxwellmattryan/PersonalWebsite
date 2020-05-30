const express = require('express');
const router = express.Router();

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
router.get('/posts/:title', (req, res, next) => {
    Post.findOne({title: req.params.title}, (err, post) => {
        if(err) throw err;

        res.json(post);
    });
});

router.put('/posts/:title', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    const newPost = new Post({
        _id:            req.body._id,
        title:          req.body.title, 
        subtitle:       req.body.subtitle,
        topics:         req.body.topics,
        author:         req.body.author,
        description:    req.body.description,
        content:        req.body.content,
        imageURL:       req.body.imageURL,
        created:        Date.now(),
        updated:        Date.now()
    });

    // TODO: finish writing put request and handle ID logic in front end

    // the topic IDs are handle by the front end (when requesting any sort of editor page, the topics will be 
    // requested therefore the IDs will already be there - no need to 'find' them via mongoose in here)
    res.json(newPost);
});

router.delete('/posts/:title', passport.authenticate('jwt', { session: false }), (req, res, next) => {
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