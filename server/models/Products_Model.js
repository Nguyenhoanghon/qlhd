const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DetailProduct = new Schema({
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
});

const Products = new Schema({
  Incentive: Number,
  ListProducts: [DetailProduct],
  contract: {
    type: Schema.Types.ObjectId,
    ref: "Contract",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Products", Products);
