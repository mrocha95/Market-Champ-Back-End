var express = require("express");
var router = express.Router();
const axios = require("axios");

const Ticker = require("../models/Ticker");

/* GET home page. */
router.get("/:ticker/:time", async (req, res, next) => {
  try {
    let endTime = Date.now();

    //Default
    let startTime = Date.now() - 1.577 * 10 ** 10;
    let range = "week";

    if (req.params.time === "1d") {
      //day chart
      startTime = Date.now() - 8.64 * 10 ** 7;
      range = "1m";
    } else if (req.params.time === "1wk") {
      //weekly chart
      startTime = Date.now() - 6.048 * 10 ** 8;
      range = "1h";
    } else if (req.params.time === "1mo") {
      //monthly chart
      startTime = Date.now() - 2.628 * 10 ** 9;
      range = "1h";
    } else if (req.params.time === "6mo") {
      //6 month chart
      startTime = Date.now() - 1.577 * 10 ** 10;
      range = "1d";
    } else if (req.params.time === "1y") {
      //yearly chart
      startTime = Date.now() - 3.156 * 10 ** 10;
      range = "1d";
    }

    const options = {
      method: "GET",
      url: `https://query1.finance.yahoo.com/v8/finance/chart/${req.params.ticker}?metrics=high?&interval=${range}&range=${req.params.time}`,
      // url: `https://api.polygon.io/v2/aggs/ticker/${req.params.ticker}/range/1/${range}/${startTime}/${endTime}`,
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
