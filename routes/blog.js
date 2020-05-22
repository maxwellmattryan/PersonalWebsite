const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");

const passport = require("passport");
require("../config/passport")(passport);

const Post = require("../models/post");

// POSTS
router.get("/", (req, res, next) => {
    Post.find({}, (err, posts) => {
        res.render("blog", {posts: posts});
    });
});

router.get("posts/:id", (req, res, next) => {
    res.send("TODO: Display specific blog post based on id");
});

router.post("/posts", passport.authenticate("jwt", { session: false }),  (req, res, next) => {
    const newPost = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title, 
        subtitle: req.body.subtitle,
        category: req.body.category,
        author: req.body.author,
        description: req.body.description,
        content: req.body.content,
        imageUrl: req.body.imageUrl,
        created: Date.now(),
        updated: Date.now()
    });

    newPost.save()
    .then(result => res.redirect("/blog"))
    .catch(err => {console.log(err); res.status(400).send("Unable to create blog post.");});
});

router.put("/posts/:id", /* AUTHENTICATE HATE */ (req, res, next) => {
    res.send("TODO: Add support for updating a post");
});

router.delete("/posts/:id", /* AUTHENTICATE HERE */ (req, res, next) => {
    res.send("TODO: Add support for deleting a post");
});

// CATEGORIES
router.get("/categories/:category", (req, res, next) => {
    res.send("TODO: Display category with all related blog posts");
});

router.post("/categories", /* AUTHENTICATE HERE */ (req, res, next) => {
    res.send("TODO: Add a new category")
});

router.put("/categories/:category", /* AUTHENTICATE HERE */ (req, res, next) => {
    res.send("TODO: Add support for updating category information");
});

module.exports = router;