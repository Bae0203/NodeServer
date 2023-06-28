const mongoose = require("mongoose");

const postShema = new mongoose.Schema({
  name: String,
  age: Number,
});

const Post = mongoose.model("post", postShema);

module.exports = Post;
