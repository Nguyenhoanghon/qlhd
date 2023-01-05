const mongoose = require("mongoose");

const ProductCost = mongoose.model(
  "ProductCost",
  new mongoose.Schema({
    ProductName: String,
    Quantity: Number,
    EX_W: Number, // nhap tu nuoc ngoai = true
    FOBCost: Number, //if(EX_W = =true, req.body.FOBCost, 0)
    RatioUSD: Number, //if(EX_W = =true, req.body.RatioUSD, 0)
    InputPrice: Number, // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
    OutputPrice: Number, // Nhap
    InputIntoMoney: Number, // Can tinh  = Quantity * InputPrice
    OutputIntoMoney: Number, //Can tinh =  Quantity * OutputPrice
    Insurance: Boolean,
    Incentive: Number,
    Note: String,
    contract:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
      }
  })
);

module.exports = ProductCost;