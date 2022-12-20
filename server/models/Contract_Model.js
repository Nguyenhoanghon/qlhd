const mongoose = require("mongoose");

const Contract = mongoose.model(
  "Contract",
  new mongoose.Schema({
    Center: String,
    Deparment: String,
    CustomerID: String,
    ContractID: String,
    Date: Date,
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  })
);

module.exports = Contract;

