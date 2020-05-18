const express = require("express");
const router = express.Router();

const Post = require("../models/post");

router.get("/test", (req, res, next) => {
    res.send("This is a test blog post.");
});

router.post("/create", (req, res, next) => {
    let newPost = new Post({
        title: req.body.title,
        subtitle: req.body.subtitle,
        category: req.body.category,
        content: req.body.content,
        image: req.body.image
    });

    Post.addPost(newPost, (err, post) => {
        if(err) {
            res.json({success: false, msg: "Failed to create blog post", data: newPost});
        } else {
            res.json({success: true, msg: "Created blog post", data: newPost});
        }
    });
})

module.exports = router;