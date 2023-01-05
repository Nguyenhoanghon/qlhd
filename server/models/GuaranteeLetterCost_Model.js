const mongoose = require("mongoose");

const GuaranteeLetterCost = mongoose.model(
  "GuaranteeLetterCost",
  new mongoose.Schema({
    Content: String,
    Cost: Number,
    QuantityMonths: Number,
    RatioCost: Number,
    IntoMoney: Number,
    Note: String,
    contract:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
      }
  })
);

module.exports = GuaranteeLetterCost;
