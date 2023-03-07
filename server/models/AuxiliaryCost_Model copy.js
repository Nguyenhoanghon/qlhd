const mongoose = require("mongoose");

const AuxiliaryCost = mongoose.model(
  "AuxiliaryCost",
  new mongoose.Schema({
    Renevue: Number,
    Plan: Boolean, // Lua chon gia tri, M 
    Content: String, 
    Cost: Number, // = if(Cost<1; Cost*CapitalCost ; Cost)
    Note: String,
    contract:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
      }
  })
);

module.exports = AuxiliaryCost;