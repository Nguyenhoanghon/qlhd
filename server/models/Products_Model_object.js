
const mongoose = require("mongoose");

const Products = mongoose.model(
  "Products",
  new mongoose.Schema({
    Incentive: Number,
    DetailProduct: {
      ProductName: String,
      Quantity: Number,
      EX_W: Boolean, // nhap tu nuoc ngoai = true
      FOBCost: Number, //if(EX_W = =true, req.body.FOBCost, 0)
      RatioUSD: Number, //if(EX_W = =true, req.body.RatioUSD, 0)
      InputPrice: Number, // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
      OutputPrice: Number, // Nhap
      InputIntoMoney: Number, // Can tinh  = Quantity * InputPrice
      OutputIntoMoney: Number, //Can tinh =  QuantÏity * OutputPrice
      Insurance: Boolean,
      Note: String,
    },
    contract:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contract"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // users replace user
    },
  })
);

module.exports = Products;