const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Contract = db.Contract;

checkDuplicateContract = (req, res, next) => {
  Contract.findOne({
    ContractID: req.body.ContractID
  }).exec((err, contract) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (contract) {
      res.status(400).send({ message: `Failed! Contract ${req.body.ContractID}is already Exited!` });
      return;
    }
    else
    next();

  });
};


const ValidData = {
  checkDuplicateContract
};

module.exports = ValidData;
