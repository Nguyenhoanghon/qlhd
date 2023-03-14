const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CostDetail = new Schema({
  NameCost: String,
  Units: String,
  UnitPrice: Number,
  Quantity_days: Number,
  Quantity_times: Number,
  IntoMoney: Number,
  Note: String
});

const ContentCost = new Schema({
  Content: String,
  Costs: [CostDetail],
});

const Implementation_Cost = new Schema({
  Category: String,
  StagesImplementation: [ContentCost],

  contract: {
    type: Schema.Types.ObjectId,
    ref: "Contract",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // users replace user
  },
});

module.exports = mongoose.model("Implementation_Cost", Implementation_Cost);
