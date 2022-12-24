const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;
const Contract = db.Contract;
const ProductCost = db.ProductCost

capitalCost = (req,res, ContractIDparam) => {
    console.log("gọi hàm tinh tổng thành tiền CapitalCost hàng cho 1 hợp đồng");
    console.log(ContractIDparam);
    const product = new ProductCost;
    Contract.find({ContractID: req.body.ContractID },(err,Contract)=>{
      console.log(Contract)
    })
    return 100;
}
//find product cost theo hop dong ContractID
// tính tổng tanh tiền
//return tổng thành tiền


revenue= (req,res, ContractIDparam) => {
  console.log("gọi hàm tinh tổng thành tiền revenue hàng cho 1 hợp đồng");
  console.log(ContractIDparam);
  return 100;
}
//find product cost theo hop dong ContractID
// tính tổng tanh tiền
//return tổng thành tiền


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
  checkDuplicateContract,
  CapitalCost,
  revenue

};

module.exports = ValidData;
