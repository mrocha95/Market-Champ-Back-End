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
    req.json(err.message);
  }
});

module.exports = router;
