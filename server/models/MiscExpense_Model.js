const mongoose = require("mongoose");

const MiscExpense = mongoose.model(
  "MiscExpense",
  new mongoose.Schema({
    Content: String,
    Cost: Number,
    Note: String,
    contract: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
      }
    ]
  })
);

module.exports = MiscExpense;
