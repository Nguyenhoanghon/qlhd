const mongoose = require("mongoose");

const MandayCost = mongoose.model(
  "MandayCost",
  new mongoose.Schema({
    RatioUSD: Number,
    Department: String,
    Cost: Number,
    StaffNumber: Number,
    ImplementationDay: Number,
    IntoMoney: Number,
    Note: String,
    contract:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
      }
  })
);

module.exports = MandayCost;
