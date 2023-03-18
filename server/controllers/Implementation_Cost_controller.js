const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const Implementation_Cost = db.Implementation_Cost;

//============== Controllers Public Access ==============//
//14/3 VIET LAI CONTROLLER
// create_Implementation_Category Khoi tao Implementation_Cost: TÊN DANH MỤC / ten giai doan
// @access Public
//Test: ok
exports.create_Implementation_Category = async (req, res) => {
  console.log("Test route ===> create_Implementation_Cost is called !", );
  const { Category, StagesImplementation, idcontract, user } = req.body;
  console.log("req.body.Category: ", req.body.Category)
  console.log("req.body.StagesImplementation: ", req.body.StagesImplementation)
  console.log("req.body.contract: hgfyvhvjjh ", req.body.idcontract)
  try {
    //Kiem tra hop dong co ton tai?
    Contract.find({ _id: req.body.idcontract }, (err, Contract) => {
      console.log("ContractContractContractContractContract: ", Contract)
      if (Contract.length != 0) {
        if (!req.body.Category || !req.body.StagesImplementation)
          return res.status(400).json({ success: false, message: "Missing Category Or StagesImplementation" });
        try {
          const newImplementation_Cost = new Implementation_Cost({
            StagesImplementation: {
              Content: req.body.StagesImplementation,
            },
            Category,
            contract: req.body.idcontract,
            user,
          })
          console.log("newImplementation_CostnewImplementation_CostnewImplementation_CostnewImplementation_Cost",newImplementation_Cost)
          newImplementation_Cost.save((err, Implementation_Cost) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.json({ success: true, message: 'Khởi tạo thành công!', Implementation_Cost: Implementation_Cost })
            /* newImplementation_Cost.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.json({ success: true, message: 'Khởi tạo thành công!', Implementation_Cost: newImplementation_Cost })
            }); */
          });

        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: " Internal server error" });
        }

      }
      else
        res.json({ success: true, message: "Hợp đồng không tồn tại!" })
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}
//End create_Implementation_Category

// Cap nhat DANH MUC CHI PHI
// @access Public
// Test: ok
exports.update_Implementation_Category = async (req, res) => {
  console.log("Test route ===> update_Implementation_Category is called !");

  const {Category} = req.body;
  console.log("req.body.idImplementation_Cost", req.params.idImplementation_Cost)
  console.log("req.body.Content", req.body.Category)


  try {
    const newImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost
      },
      {
        $set: {
          Category: req.body.Category
        }
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công!",
      update_Category: newImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Xoa DANH MUC CHI PHI
// @access Public
//ok
exports.delete_Implementation_Category = async (req, res) => {
  console.log("Test route delete_Implementation_Category");
  console.log("req.params.idImplementation_Cost", req.params.idImplementation_Cost);
  try {
    const Implementation_CostDeleteCondition = { _id: req.params.idImplementation_Cost }//, user: req.userId }
    const deletedImplementation_Cost = await Implementation_Cost.findOneAndDelete(Implementation_CostDeleteCondition)

    // User not authorised or ImplementationCost not found
    res.json({
      success: true,
      message: "Xoá thành công!",
      delete_Category: deletedImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

}

//Get all Implementations by idcontract
//@Access Public
//ok
exports.getImplementation_Cost_idcontract = async (req, res) => {
  console.log("getImplementation_Cost_Contract is called >>>>", req.params.idcontract)
  try {
    const Implementation_Cost_data = await Implementation_Cost.find({ contract: req.params.idcontract },)//.populate("contract", "-__v")
    console.log("getImplementation_Cost_idcontract", Implementation_Cost_data)
    let InputIntoMoney = 0;
    let OutputIntoMoney = 0;
    for (let i = 0; i < Implementation_Cost_data.length; i++) {
      console.log("InputIntoMoney: ", Implementation_Cost_data[i].InputIntoMoney)
      InputIntoMoney += Implementation_Cost_data[i].InputIntoMoney;
      OutputIntoMoney += Implementation_Cost_data[i].OutputIntoMoney;
    }
    console.log(">>>>>>>tong", InputIntoMoney, "-", OutputIntoMoney);
    res.json({ success: true, Implementation_Cost: Implementation_Cost_data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

//Get all Implementation_Cost
//@Access Public
//Test: ok
exports.getAllImplementation_Cost = async (req, res) => {
  console.log("getAllImplementation_Cost is called")
  try {
    const Implementation_Cost_data = await Implementation_Cost.find()//.populate("contract", "-__v")
    res.json({ success: true, Implementation_Cost: Implementation_Cost_data })
    console.log(Implementation_Cost_data)

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}

// createStagesImplementation -> Them giai doan trien khai voi id Category  idImplementation_Cost
// @access Public
// test: ok
exports.create_StagesImplementation = async (req, res) => {
  console.log("Test route ===> create_StagesImplementation is called !");

  const { Content } = req.body;
  console.log("req.body.idImplementation_Cost", req.body.idImplementation_Cost)
  console.log("req.body.Content", req.body.Content)

  if (!req.body.Content)
    return res.status(400).json({ success: false, message: "Chưa nhập nội dung!!!" });
  try {
    const newImplementation_Cost = await Implementation_Cost.findOneAndUpdate(
      {
        _id: req.body.idImplementation_Cost,
      },
      {
        $push: {
          StagesImplementation: {
            Content,
          },
        },
      },
      {
        new: true,
        upsert: true,
      }
    );
    console.log("Kiem tra Them 1 giai doan", newImplementation_Cost)
    res.json({
      success: true,
      message: "Đã thêm thành công giai đoạn!",
      StagesImplementation: newImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Cap nhat TEN GIAI DOAN 
// @access Public
// Test: ok
exports.update_Stages_Implementation_Content = async (req, res) => {
  console.log("Test route ===> update_StagesImplementation_Content is called !");

  const {Content} = req.body;
  console.log("req.body.idImplementation_Cost", req.params.idImplementation_Cost)
  console.log("req.body.Content", req.body.Content)


  try {
    const newImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost,
        "StagesImplementation": { $elemMatch: { _id: req.params.idContentCost } }
      },
      {
        $set: {
          "StagesImplementation.$.Content": req.body.Content
        }
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công!",
      StagesImplementation: newImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Xoa 1 giai doan voi id giaidoan
// @access Public
//ok
exports.delete_Stages_Implementation_Content = async (req, res) => {
  console.log("Test route delete_Stages_Implementation_Content is called !");
  console.log("req.params.idImplementation_Cost", req.params.idImplementation_Cost);
  console.log("req.params.idContentCost", req.params.idContentCost);
  try {

    const deletedImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost
      },
      {
        $pull:
        {
          "StagesImplementation": {
            _id: req.params.idContentCost
          }
        }
      }
    );
    // User not authorised or ImplementationCost not found
    if (!deletedImplementation_Cost)
      return res.status(401).json({
        success: false,
        message: 'ImplementationCost  not found or user not authorised'
      })

    res.json({ success: true, message: 'Delete  Successfull !' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

// THEM 1 chi phi cho chi phi tung giai doan
// Create Implementation_Cost - createGeneralExpense Add them chi phi chung neu can
// @access Public
//Test: ok

exports.Add_CostDetail = async (req, res) => {
  console.log("Test route ===> Add_CostDetail is called !");
  let {
    NameCost,
    Units,
    UnitPrice,
    Quantity_days,
    Quantity_times,
    IntoMoney,
    Note,
    Implementation_Cost_Id,
    ContentCostId
  } = req.body;

  try {
    if (req.body.Quantity_times == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days
    else if (req.body.Quantity_days == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_times
    else
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times

    const newImplementation_Cost = await Implementation_Cost.findOneAndUpdate(
      {
        _id: req.body.Implementation_Cost_Id,//req.params.idImplementation_Cost,
        "StagesImplementation._id": req.body.ContentCostId//req.params.idContentCost, //nhan tu tham so
      },
      {
        $push: { // !!!!
          "StagesImplementation.$.Costs": {
            NameCost,
            Units,
            UnitPrice,
            Quantity_days,
            Quantity_times,
            IntoMoney,
            Note
          },
        },
        //contract: hopdongId,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Đã thêm chi phí vao chi phi giai doan",
      Implementation_Cost: newImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

}

// Cap nhat 1 chi phi trong giai doan chi phi CHUNG
// @access Public
// Test: 

exports.update_CostDetail = async (req, res) => {
  console.log("Test route ===> CAP NHAT 1 CHI PHI TRONG Giai doan chi phi TRIEN KHAI is called !");

  let {
    NameCost,
    Units,
    UnitPrice,
    Quantity_days,
    Quantity_times,
    IntoMoney,
    Note,
    Implementation_Cost_Id,
    ContentCostId,
    idCost
  } = req.body;

  console.log("idcontract==========", req.params.idImplementation_Cost)
  console.log("idContentCost==========", req.params.idContentCost)
  console.log("idCost", req.params.idCost)
  console.log("idCost", req.body.NameCost)

  try {
    if (req.body.Quantity_times == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days
    else if (req.body.Quantity_days == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_times
    else
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times

    const newImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost,
        "StagesImplementation": { $elemMatch: { _id: req.params.idContentCost } },
        "StagesImplementation.Costs": {$elemMatch : {_id:  req.params.idCost }}
      },
      { // !!!!
        $set: {
          "StagesImplementation.$.Costs.$[elements]": {
            _id: req.params.idCost,
            NameCost: req.body.NameCost,
            Units: req.body.Units,
            UnitPrice: req.body.UnitPrice,
            Quantity_days: req.body.Quantity_days,
            Quantity_times: req.body.Quantity_times,
            IntoMoney: IntoMoney,
            Note: req.body.Note
          },
        }
      },
      {
        arrayFilters: [{ "elements._id": req.params.idCost }]
        /* new: false,
        upsert: false, */
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công!",
      StagesImplementation: newImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Xoa 1 chi phi trong 1 giai doan chi phi trien khai
// @access Public
//ok
exports.delete_CostDetail = async (req, res) => {
  console.log("Test route delete_CostDetail !");
  console.log("ID Chi phi", req.params.idImplementation_Cost);
  console.log("ID Giai doan", req.params.idContentCost);
  console.log("ID Cost", req.params.idCost);
  try {

    const deletedImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost,
        "StagesImplementation._id": req.params.idContentCost
      },
      {
        $pull:
        {
          "StagesImplementation.$.Costs": {
            _id: req.params.idCost
          }

        }
      }
    );
      console.log("responeData",res.message)
    // User not authorised or Implementation_Cost not found
    if (!deletedImplementation_Cost)
      return res.status(401).json({
        success: false,
        message: 'Not found or user not authorised'
      })
    else
      res.json({ success: true, message: 'Delete Successfull !', responeData: deletedImplementation_Cost })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

///======================================= 14-3

