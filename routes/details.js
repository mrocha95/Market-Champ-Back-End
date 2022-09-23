var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/:ticker", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${req.params.ticker}`,
    };

    const response = await axios.request(options);

    res.json(response.data);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
