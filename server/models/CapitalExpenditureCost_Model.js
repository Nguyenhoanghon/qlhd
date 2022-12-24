const mongoose = require("mongoose");

const CapitalExpenditureCost = mongoose.model(
  "CapitalExpenditureCost",
  new mongoose.Schema({
    CapitalCost: Number, // Load từ form 1
    Revenue: Number,  // Load từ form 1
    CapitalExpense: Number, // = (InventoryDays + Số ngày triển khai - BedtDays)*CapitalCost + ((Revenue - Deposits + DepositsNTP) * DebtCollectionDays * 10%)/365 
    InventoryDays: Number, 
    ImplementationDays: Number,
    BedtDays: Number,
    DebtCollectionDays: Number, 
    Deposits: Number, // can tinh = Revenue * 20%
    DepositsNTP: Number, //can tinh = CapitalCost * 30%
    Note: String,
    contract: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
      }
    ]
  })
);

module.exports = CapitalExpenditureCost;
