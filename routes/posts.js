var express = require("express");
var router = express.Router();
const Post = require("../models/Posts");
const { isAuthenticated } = require("../middleware/auth");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({ title: "Posts" });
});
router.get("/all", async (req, res) => {
  try {
    const allPosts = await Post.find().populate("creatorId");
    res.json(allPosts);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/ticker-posts/:ticker", async (req, res) => {
  try {
    const allPosts = await Post.find({ ticker: req.params.ticker }).populate(
      "creatorId"
    );
    res.json(allPosts);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/my-posts", isAuthenticated, async (req, res) => {
  try {
    const allPosts = await Post.find({ creatorId: req.user.id });
    res.json(allPosts);
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/user-posts/:id", async (req, res) => {
  try {
    const allPosts = await Post.find({ creatorId: req.params.id });
    res.json(allPosts);
  } catch (err) {
    res.json(err.message);
  }
});

router.post("/create", isAuthenticated, async (req, res) => {
  try {
    let newPost = await Post.create({
      // title: req.body.title,
      ticker: req.body.ticker,
      content: req.body.content,
      date: req.body.date,
      creatorId: req.user.id,
    });
    res.json(newPost);
  } catch (err) {
    res.json(err.message);
  }
});

router.delete("/delete-post/:id", isAuthenticated, async (req, res) => {
  try {
    const removedPost = await Post.findByIdAndDelete(req.params.id);
    res.json(removedPost);
  } catch (err) {
    res.json(err.message);
  }
});

// router.post("/update-deleted-user-posts/:id", isAuthenticated, async (req, res) => {
//   try {
//     const updatedPost = await Post.findByIdAndUpdate(req.params.id);
//     res.json(updatedPost);
//   } catch (err) {
//     res.json(err.message);
//   }
// });

module.exports = router;
