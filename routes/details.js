var express = require("express");
var router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const options = {
      method: "GET",
      url: "/v3/reference/tickers/AAPL",
      headers: {
        Authorization: process.env.STOCK_API,
      },
    };

    const response = await axios.request(options);

    res.json(response.data);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
