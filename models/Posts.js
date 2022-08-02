const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  ticker: {
    type: String,
    // required: true,
  },
  content: {
    type: String,
    // required: true,
    minlength: 4,
  },
  date: {
    type: String,
    // required: true,
  },
  creatorId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
