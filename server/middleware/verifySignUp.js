const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Contract = db.Contract;
const CapitalExpenditureCost = db.CapitalExpenditureCost;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (user) {
      res.status(400).send({ message: "Failed! Username is already in use!" });
      return;
    }

    // Email
    User.findOne({
      email: req.body.email
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  console.log("Goi ham checkRolesExited")
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      console.log(req.body.roles[i])
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
      }

    }
  }

  next();
};


checkDuplicateContract = (req, res, next) => {
  Contract.findOne({
    ContractID: req.body.ContractID
  }).exec((err, contract) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (contract) {
      res.status(400).send({ message: `Hợp đồng ${req.body.ContractID} đã tồn tại!` });
      return;
    }
    else
    next();

  });
};

checkDuplicateCapitalExpenditureCost = (req, res, next) => {
  CapitalExpenditureCost.findOne({
    contract: req.body.ContractID
  }).exec((err, CapitalExpenditureCost) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (CapitalExpenditureCost) {
      res.status(400).send({ message: `Chi phí vốn đã tồn tại!` });
      return;
    }
    else
    next();

  });
};


const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
  checkDuplicateContract,
  checkDuplicateCapitalExpenditureCost
};

module.exports = verifySignUp;
