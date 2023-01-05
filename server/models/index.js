const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User_Model");
db.role = require("./Role_Model");
db.Contract = require ("./Contract_Model");
db.MiscExpense = require("./MiscExpense_Model");
db.GuaranteeLetterCost = require("./GuaranteeLetterCost_Model");
db.MandayCost = require ("./MandayCost_Model");
db.ProductCost = require("./ProductCost_Model");
db.CapitalExpenditureCost = require("./CapitalExpenditureCost_Model");
db.AuxiliaryCost = require("./AuxiliaryCost_Model");
db.ImplementationCost = require("./ImplementationCost_Model")

db.ROLES = ["User", "AM", "Manager", "Director", "Admin"];

module.exports = db;