const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    subtitle: String,
    category: { type: Schema.Types.ObjectId, ref: "Category"},
    author: String,
    description: String,
    content: String,
    imageUrl: String,
    created: { type: Date },
    updated: { type: Date, default: Date.now }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;