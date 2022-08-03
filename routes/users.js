var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { isAuthenticated } = require("../middleware/auth");
const saltrounds = 10;

const fileUploader = require("..//middleware/cloudinary");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ message: "respond with a resource" });
});

router.post("/signup", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({ message: "Please enter username and password" });
  }
  try {
    const salt = bcrypt.genSaltSync(saltrounds);
    const hashedPass = bcrypt.hashSync(req.body.password, salt);

    const newUser = await User.create({
      username: req.body.username,
      password: hashedPass,
    });
    res.json(newUser);

    const payload = {
      username: newUser.username,
      id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/login", async (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.json({ message: "Please enter username and password" });
  }
  try {
    let foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      return res.json({ message: "Incorrect username or password" });
    }
    const isMatch = bcrypt.compareSync(req.body.password, foundUser.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect username or password" });
    }
    const payload = {
      username: foundUser.username,
      id: foundUser._id,
    };
    const token = jwt.sign(payload, process.env.SECRET, {
      algorithm: "HS256",
      expiresIn: "6h",
    });
    res.json({
      token: token,
      username: foundUser.username,
      profilePicture: foundUser.profilePic,
    });
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/my-profile", async (req, res) => {
  res.json({ message: "my profile" });
});

router.get("/login-test", isAuthenticated, function (req, res) {
  res.json({ message: "You are logged in" });
});

router.post(
  "/add-picture",
  fileUploader.single("imageUrl"),
  async (req, res) => {
    res.json(req.file);
  }
);

module.exports = router;
