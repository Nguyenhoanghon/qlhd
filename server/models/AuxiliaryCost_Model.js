const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContentCost = new Schema({
  Content: String,
  Cost: Number,
  Note: String
});

const AuxiliaryCost = new Schema({
  Renevue: Number,
  Plan: Number, // Lua chon gia tri, M 
  ListCosts: [ContentCost],
  contract: {
    type: Schema.Types.ObjectId,
    ref: "Contract",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", // users replace user
  },
});

module.exports = mongoose.model("AuxiliaryCost", AuxiliaryCost);
