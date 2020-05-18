const mongoose = require("mongoose");
const config = require("../config/database");

const PostSchema = mongoose.Schema({
    title: {
        type: String
    },
    subtitle: {
        type: String
    },
    createdAt: {
        type: Date
    },
    category: {
        type: String
    },
    content: {
        type: Array
    },
    image: {
        type: String
    }
});

const Post = module.exports = mongoose.model("Post", PostSchema);

module.exports.addPost = function(newPost, callback) {
    newPost.save(callback);
}