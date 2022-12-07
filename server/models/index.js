const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./User_Model");
db.role = require("./Role_Model");

db.ROLES = ["User", "AM", "Manager", "Director", "CEO"];

module.exports = db;