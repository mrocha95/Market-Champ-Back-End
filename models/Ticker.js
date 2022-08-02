const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  ticker: {
    type: String,
  },
});

const Ticker = mongoose.model("Ticker", userSchema);

module.exports = Ticker;
