var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/:input", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: `https://query1.finance.yahoo.com/v1/finance/search?q=${req.params.input}`,
    };

    const response = await axios.request(options);

    res.json(response.data);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
