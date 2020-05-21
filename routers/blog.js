const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render("blog", {posts: posts});
    });
});

router.post("/create", (req, res) => {
    const newPost = new Post({
        title: req.body.title, 
        content: req.body.content
    });

    console.log(newPost);

    newPost.save()
    .then(result => res.redirect("/blog"))
    .catch(err => res.status(400).send("Unable to create blog post."));
});

module.exports = router;