const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const ImplementationCost = db.ImplementationCost;

//============== Controllers Public Access ==============//
//Get all ImplementationCost by idcontract
//@Access Public
//ok
exports.getImplementationCost_idcontract = async (req, res) => {
  console.log("getImplementationCost_Contract is called >>>>", req.params.idcontract)
  try {
    const ImplementationCost_data = await ImplementationCost.find({ contract: req.params.idcontract },)//.populate("contract", "-__v")
    console.log("getImplementationCost_idcontract", ImplementationCost_data)
    let InputIntoMoney = 0;
    let OutputIntoMoney = 0;
    for (let i = 0; i < ImplementationCost_data.length; i++) {
      console.log("InputIntoMoney: ", ImplementationCost_data[i].InputIntoMoney)
      InputIntoMoney += ImplementationCost_data[i].InputIntoMoney;
      OutputIntoMoney += ImplementationCost_data[i].OutputIntoMoney;
    }
    console.log(">>>>>>>tong", InputIntoMoney, "-", OutputIntoMoney);
    res.json({ success: true, ImplementationCost: ImplementationCost_data })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

//Get all ImplementationCost
//@Access Public
//Test: ok
exports.getAllImplementationCost = async (req, res) => {
  console.log("getAllImplementationCost is called")
  try {
    const ImplementationCost_data = await ImplementationCost.find()//.populate("contract", "-__v")
    res.json({ success: true, ImplementationCost: ImplementationCost_data })
    console.log(ImplementationCost_data)

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
}


// Create ImplementationCost add chi phi chung va 1 giai doan chi phi trien khai
// goi ham nay khoi tao 1  ImplementationCost
// @access Public
//Test: ok
exports.createImplementationCost = async (req, res) => {
  console.log("Test route ===> CHi phi trien khai moiw is called !");
  const { GeneralExpense, StagesImplementation, idcontract } = req.body;
  console.log("GeneralExpense", req.body.GeneralExpense)
  console.log("StagesImplementation", req.body.StagesImplementation)
  try {

    //Kiem tra hop dong co ton tai?
    Contract.find({ _id: req.body.idcontract }, (err, Contract) => {
      if (Contract.length != 0)
        console.log(">>>>>>>>>>> Find Cotract");
      else
        res.json({ success: true, message: "Not found Contract" })
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

  if (!req.body.GeneralExpense || !req.body.StagesImplementation)
    return res.status(400).json({ success: false, message: "Missing GeneralExpense Or StagesImplementation" });
  try {
    const newImplementationCost = await ImplementationCost.findOneAndUpdate(
      {
        contract: req.body.idcontract,
      },
      {
        $push: {
          GeneralExpense: {
            Content: req.body.GeneralExpense,
          },
          StagesImplementation: {
            Content: req.body.StagesImplementation,
          },
        },
        contract: req.body.idcontract,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Đã thêm ImplementationCost",
      ImplementationCost: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: " Internal server error" });
  }
}

// Them 1 giai doan chi phi chung
// @access Public
//ok

exports.createGeneralExpense = async (req, res) => {
  console.log("Test route ===> THEM GIAI ĐOẠN Giai doan chi phi chung is called !");
  const { Content, idcontract } = req.body;
  console.log("idcontract==========", req.body.idcontract)
  console.log("Content", req.body.Content)
  try {
    //Kiem tra hop dong co ton tai?
    Contract.find({ _id: req.body.idcontract }, (err, Contract) => {
      if (Contract.length != 0)
        console.log(">>>>>>>>>>> Find Cotract");
      else
        res.json({ success: true, message: "Not found Contract" })
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }
  if (!req.body.Content)
    return res.status(400).json({ success: false, message: "Missing noidung" });
  try {
    const newImplementationCost = await ImplementationCost.findOneAndUpdate(
      {
        contract: req.body.idcontract,
      },
      { 
        $push: {
          GeneralExpense: {
            Content,
          },
        },
        contract: req.body.idcontract,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Thêm thành công giai đoạn chi phí chung",
      StagesImplementation: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Create ImplementationCost -> createStagesImplementation neu co them giai doan
// @access Public
exports.createStagesImplementation = async (req, res) => {
  console.log("Test route ===> Giai doan chi phi Trien khai is called !");

  const { Content } = req.body;
  console.log("idcontract revuer", req.body.idcontract)
  console.log("Content revuer", req.body.Content)
  try {
    //Kiem tra hop dong co ton tai?
    Contract.find({ _id: req.body.idcontract }, (err, Contract) => {
      if (Contract.length != 0)
        console.log(">>>>>>>>>>> Find Cotract");

      else
        res.json({ success: true, message: "Not found Contract" })
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

  if (!req.body.Content)
    return res.status(400).json({ success: false, message: "Chưa nhập nội dung!!!" });
  try {
    const newImplementationCost = await ImplementationCost.findOneAndUpdate(
      {
        contract: req.body.idcontract,
      },
      {
        $push: {
          StagesImplementation: {
            Content,
          },
        },
        contract: req.body.idcontract,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
      }
    );
    console.log("Kiem tra Them 1 giai doan", newImplementationCost)
    res.json({
      success: true,
      message: "Đã thêm thành công giai đoạn triển khai",
      StagesImplementation: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// them 1 chi phi cho chi phi chung
// Create ImplementationCost - createGeneralExpense Add them chi phi chung neu can
// @access Public

exports.AddCostDetail = async (req, res, _id) => {
  console.log("Test route ===> AddCostDetail is called !");
  let {
    NameCost,
    Units,
    UnitPrice,
    Quantity_days,
    Quantity_times,
    IntoMoney,
    Note,
    ImplementationCost_Id,
    ContentCostId
  } = req.body;
  console.log("id chi phí:", req.body.ImplementationCost_Id);
  console.log("id chi phí:", req.body.ContentCostId);
  try {
    if (req.body.Quantity_times == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days
    else if (req.body.Quantity_days == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_times
    else
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times

    const newImplementationCost = await ImplementationCost.findOneAndUpdate(
      {
        _id: req.body.ImplementationCost_Id,//req.params.idImplementationCost,
        "GeneralExpense._id": req.body.ContentCostId//req.params.idContentCost, //nhan tu tham so
      },
      {
        $push: {
          "GeneralExpense.$.Costs": {
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
      message: "Đã thêm chi phí vao chi phi chung",
      ImplementationCost: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

}

// them 1 chi phi cho chi phi tung giai doan
// Create ImplementationCost - createGeneralExpense Add them chi phi chung neu can
// @access Public

exports.AddCostDetailStage = async (req, res) => {
  console.log("Test route ===> AddCostDetailStage is called !");
  let {
    NameCost,
    Units,
    UnitPrice,
    Quantity_days,
    Quantity_times,
    IntoMoney,
    Note,
    ImplementationCost_Id,
    ContentCostId
  } = req.body;

  try {
    if (req.body.Quantity_times == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days
    else if (req.body.Quantity_days == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_times
    else
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times

    const newImplementationCost = await ImplementationCost.findOneAndUpdate(
      {
        _id: req.body.ImplementationCost_Id,//req.params.idImplementationCost,
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
      ImplementationCost: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

}
// Cap nhat 1 giai doan chi phi chung
// @access Public
// Test: Rest ok

exports.update_GeneralExpense_Content = async (req, res) => {
  console.log("Test route ===> SUA GIAI ĐOẠN Giai doan chi phi chung is called !");

  const { Content,idcontract,idContentCost } = req.body;
  console.log("idcontract==========", req.params.idImplementationCost)
  console.log("idContentCost==========", req.params.idContentCost)
  console.log("Content", req.body.Content)
  
  try {
    const newImplementationCost = await ImplementationCost.updateOne(
      {
        _id: req.params.idImplementationCost,
        "GeneralExpense": {$elemMatch : {_id:  req.params.idContentCost}}
      },
      {
        $set: {
          "GeneralExpense.$.Content":  req.body.Content
        }
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công giai đoạn chi phí chung",
      StagesImplementation: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Cap nhat 1 giai doan chi phi TRIEN KHAI
// @access Public
// Test: Rest ok

exports.update_StagesImplementation_Content = async (req, res) => {
  console.log("Test route ===> SUA GIAI ĐOẠN Giai doan chi phi chung is called !");

  const { Content,idcontract,idContentCost } = req.body;
  console.log("idcontract==========", req.body.idcontract)
  console.log("idContentCost==========", req.body.idContentCost)
  console.log("Content", req.body.Content)
  
  try {
    const newImplementationCost = await ImplementationCost.updateOne(
      {
        contract: req.body.idcontract,
        "StagesImplementation": {$elemMatch : {_id:  req.body.idContentCost}}
      },
      {
        $set: {
          "StagesImplementation.$.Content":  req.body.Content
        }
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công giai đoạn chi phí chung",
      StagesImplementation: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Cap nhat 1 chi phi trong giai doan chi phi chung
// @access Public
// Test: 

exports.update_GeneralExpense_Cost = async (req, res) => {
  console.log("Test route ===> CAP NHAT 1 CHI PHI TRONG Giai doan chi phi CHUNG is called !");

  let {
    NameCost,
    Units,
    UnitPrice,
    Quantity_days,
    Quantity_times,
    IntoMoney,
    Note,
    ImplementationCost_Id,
    ContentCostId,
    idCost
  } = req.body;

  console.log("idcontract==========", req.body.idcontract)
  console.log("idContentCost==========", req.body.idContentCost)
  console.log("idCost", req.body.idCost)
  try {
    const newImplementationCost = await ImplementationCost.updateOne(
      {
        contract: req.body.idcontract,
        "GeneralExpense": {$elemMatch : {_id:  req.body.idContentCost }},
        "GeneralExpense.Costs": {$elemMatch : {_id:  req.body.idCost }}
      },
      { // !!!!
        $set: {
          "GeneralExpense.$.Costs": {
            _id: req.body.idCost,
            NameCost: req.body.NameCost,
            Units: req.body.Units,
            UnitPrice: req.body.UnitPrice,
            Quantity_days: req.body.Quantity_days,
            Quantity_times: req.body.Quantity_times,
            IntoMoney: req.body.IntoMoney,
            Note: req.body.Note
          },
        }
      },
      {
        new: false,
        upsert: false,
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công!",
      StagesImplementation: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Cap nhat 1 chi phi trong giai doan chi phi CHUNG
// @access Public
// Test: 

exports.update_StagesImplementation_Cost = async (req, res) => {
  console.log("Test route ===> CAP NHAT 1 CHI PHI TRONG Giai doan chi phi TRIEN KHAI is called !");

  let {
    NameCost,
    Units,
    UnitPrice,
    Quantity_days,
    Quantity_times,
    IntoMoney,
    Note,
    ImplementationCost_Id,
    ContentCostId,
    idCost
  } = req.body;

  console.log("idcontract==========", req.body.idcontract)
  console.log("idContentCost==========", req.body.idContentCost)
  console.log("idCost", req.body.idCost)
  
  try {
    const newImplementationCost = await ImplementationCost.updateOne(
      {
        contract: req.body.idcontract,
        "StagesImplementation": {$elemMatch : {_id:  req.body.idContentCost }},
        "StagesImplementation.Costs": {$elemMatch : {_id:  req.body.idCost }}
      },
      { // !!!!
        $set: {
          "StagesImplementation.$.Costs": {
            _id: req.body.idCost,
            NameCost: req.body.NameCost,
            Units: req.body.Units,
            UnitPrice: req.body.UnitPrice,
            Quantity_days: req.body.Quantity_days,
            Quantity_times: req.body.Quantity_times,
            IntoMoney: req.body.IntoMoney,
            Note: req.body.Note
          },
        }
      },
      {
        new: false,
        upsert: false,
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công!",
      StagesImplementation: newImplementationCost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// Delete  ImplementationCost by id
// @access Public
//ok
exports.deleteImplementationCost = async (req, res) => {
  console.log("Test route deleteImplementationCost !");
  console.log(req.params.id);
  try {
    const ImplementationCostDeleteCondition = { contract: req.params.id }//, user: req.userId }
    const deletedImplementationCost = await ImplementationCost.findOneAndDelete(ImplementationCostDeleteCondition)

    // User not authorised or ImplementationCost not found
    if (!deletedImplementationCost)
      return res.status(401).json({
        success: false,
        message: 'ImplementationCost not found or user not authorised'
      })

    res.json({ success: true, message: 'Delete ImplementationCost Successfull !' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

// Xoa 1 giai doan voi id giaidoan
// @access Public
//ok
exports.deleteImplementationCost_ContentCost = async (req, res) => {
  console.log("Test route deleteImplementationCost_ContentCost !");
  console.log("ID Giai doan", req.params.idContentCost);
  try {

    const deletedImplementationCost = await ImplementationCost.updateOne(
      {
        _id: req.params.idImplementationCost
      },
      {
        $pull:
        {
          "GeneralExpense": {
            _id: req.params.idContentCost
          },
          "StagesImplementation": {
            _id: req.params.idContentCost
          }
        }
      }
    );

    // User not authorised or ImplementationCost not found
    if (!deletedImplementationCost)
      return res.status(401).json({
        success: false,
        message: 'ImplementationCost GeneralExpense not found or user not authorised'
      })

    res.json({ success: true, message: 'Delete GeneralExpense Successfull !' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}
// Xoa 1 chi phi trong 1 giai doan chi phi chung 
// @access Public
//ok
exports.deleteImplementationCost_GeneralCostDetail = async (req, res) => {
  console.log("Test route deleteImplementationCost_GeneralCostDetail !");
  console.log("ID Chi phi", req.params.idImplementationCost);
  console.log("ID Giai doan", req.params.idContentCost);
  console.log("ID Cost", req.params.id);
  try {

    const deletedImplementationCost = await ImplementationCost.updateOne(
      {
        _id: req.params.idImplementationCost,
        "GeneralExpense._id": req.params.idContentCost
      },
      {
        $pull:
        {
          "GeneralExpense.$.Costs": {
            _id: req.params.id
          }
        }
      }
    );

    // User not authorised or ImplementationCost not found
    if (!deletedImplementationCost)
      return res.status(401).json({
        success: false,
        message: 'Not found or user not authorised'
      })

    res.json({ success: true, message: 'Delete Successfull !' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

// Xoa 1 chi phi trong 1 giai doan chi phi trien khai
// @access Public
//ok
exports.deleteImplementationCost_StageCostDetail = async (req, res) => {
  console.log("Test route deleteImplementationCost_StageCostDetail !");
  console.log("ID Chi phi", req.params.idImplementationCost);
  console.log("ID Giai doan", req.params.idContentCost);
  console.log("ID Cost", req.params.id);
  try {

    const deletedImplementationCost = await ImplementationCost.updateOne(
      {
        _id: req.params.idImplementationCost,
        "StagesImplementation._id": req.params.idContentCost
      },
      {
        $pull:
        {
          "StagesImplementation.$.Costs": {
            _id: req.params.id
          }

        }
      }
    );

    // User not authorised or ImplementationCost not found
    if (!deletedImplementationCost)
      return res.status(401).json({
        success: false,
        message: 'Not found or user not authorised'
      })
    else
      res.json({ success: true, message: 'Delete Successfull !' })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

//================== cac ham chuc nang ================================//
