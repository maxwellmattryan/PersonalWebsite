const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    description: String,
    posts: [{type: Schema.Types.ObjectId, ref: "Post"}],
    imageUrl: String
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;