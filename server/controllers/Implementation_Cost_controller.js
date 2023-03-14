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
  console.log("Test route ===> create_Implementation_Cost is called !");
  const { Category, StagesImplementation, contract, user } = req.body;
  console.log("Category: ", req.body.Category)
  console.log("StagesImplementation: ", req.body.StagesImplementation)
  console.log("StagesImplementation: ", req.body.contract)
  try {
    //Kiem tra hop dong co ton tai?
    Contract.find({ _id: req.body.contract }, (err, Contract) => {
      if (Contract.length != 0) {
        if (!req.body.Category || !req.body.StagesImplementation)
          return res.status(400).json({ success: false, message: "Missing Category Or StagesImplementation" });
        try {
          const newImplementation_Cost = new Implementation_Cost({
            StagesImplementation: {
              Content: req.body.StagesImplementation,
            },
            Category,
            contract,
            user,
          })
          newImplementation_Cost.save((err, Implementation_Cost) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            newImplementation_Cost.save(err => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
              res.json({ success: true, message: 'Khởi tạo thành công!', Implementation_Cost: newImplementation_Cost })
            });
          });

        } catch (error) {
          console.log(error);
          res.status(500).json({ success: false, message: " Internal server error" });
        }

      }
      else
        res.json({ success: true, message: "Hợp đồng không tồn tại! " })
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
      StagesImplementation: newImplementation_Cost,
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

    // User not authorised or Implementation_Cost not found
    if (!deletedImplementation_Cost)
      return res.status(401).json({
        success: false,
        message: 'Implementation_Cost not found or user not authorised'
      })

    res.json({ success: true, message: 'Delete Implementation_Cost Successfull !' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
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
    // User not authorised or Implementation_Cost not found
    if (!deletedImplementation_Cost)
      return res.status(401).json({
        success: false,
        message: 'Implementation_Cost not found or user not authorised'
      })
    else
        res.json({ success: true, message: 'Delete Successfull !' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

///===









// Create Implementation_Cost add chi phi chung va 1 giai doan chi phi trien khai, THÊM TÊN DANH MỤC
// goi ham nay khoi tao 1  Implementation_Cost
// @access Public
//Test: ok
exports.createImplementation_Cost = async (req, res) => {
  console.log("Test route ===> CHi phi trien khai moiw is called !");
  const { GeneralExpense, StagesImplementation, idcontract, user } = req.body;
  console.log("Category: ", req.body.Category)
  console.log("GeneralExpense: ", req.body.GeneralExpense)
  console.log("StagesImplementation: ", req.body.StagesImplementation)
  console.log("StagesImplementation: ", req.body.idcontract)
  try {

    //Kiem tra hop dong co ton tai?
    Contract.find({ _id: req.body.idcontract }, (err, Contract) => {
      if (Contract.length != 0)
        console.log(">>>>>>>>>>> Find Cotract");
      else
        res.json({ success: true, message: "Hợp đồng không tồn tại! " })
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

  if (!req.body.Category || !req.body.GeneralExpense || !req.body.StagesImplementation)
    return res.status(400).json({ success: false, message: "Missing Category Or GeneralExpense Or StagesImplementation" });
  try {
    const newImplementation_Cost = await Implementation_Cost.findOneAndUpdate(
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

        Category: req.body.Category,
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
      message: "Khởi tạo thành công chi phí triển khai !",
      Implementation_Cost: newImplementation_Cost,
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
    const newImplementation_Cost = await Implementation_Cost.findOneAndUpdate(
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
      StagesImplementation: newImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Create Implementation_Cost -> createStagesImplementation neu co them giai doan
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
    const newImplementation_Cost = await Implementation_Cost.findOneAndUpdate(
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
    console.log("Kiem tra Them 1 giai doan", newImplementation_Cost)
    res.json({
      success: true,
      message: "Đã thêm thành công giai đoạn triển khai",
      StagesImplementation: newImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// them 1 chi phi cho chi phi chung
// Create Implementation_Cost - createGeneralExpense Add them chi phi chung neu can
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
    Implementation_Cost_Id,
    ContentCostId
  } = req.body;
  console.log("id chi phí:", req.body.Implementation_Cost_Id);
  console.log("id chi phí:", req.body.ContentCostId);
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
      Implementation_Cost: newImplementation_Cost,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }

}

// them 1 chi phi cho chi phi tung giai doan
// Create Implementation_Cost - createGeneralExpense Add them chi phi chung neu can
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
// Cap nhat 1 giai doan chi phi chung
// @access Public
// Test: Rest ok
// !!!!
exports.update_GeneralExpense_Content = async (req, res) => {
  console.log("Test route ===> SUA GIAI ĐOẠN Giai doan chi phi chung is called !");

  const { GeneralExpense_Content, idcontract, idContentCost } = req.body;
  console.log("idcontract==========", req.params.idImplementation_Cost)
  console.log("idContentCost==========", req.params.idContentCost)
  console.log("Content", req.body.GeneralExpense_Content)

  try {
    const newImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost,
        "GeneralExpense": { $elemMatch: { _id: req.params.idContentCost } }
      },
      {
        $set: {
          "GeneralExpense.$.Content": req.body.GeneralExpense_Content
        }
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công giai đoạn chi phí chung",
      StagesImplementation: newImplementation_Cost,
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

  const { StagesImplementation_Content, idImplementation_Cost, idContentCost } = req.body;
  console.log("idcontract==========", req.params.idImplementation_Cost)
  console.log("idContentCost==========", req.params.idContentCost)
  console.log("Content", req.body.StagesImplementation_Content)

  try {
    const newImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost,
        "StagesImplementation": { $elemMatch: { _id: req.params.idContentCost } }
      },
      {
        $set: {
          "StagesImplementation.$.Content": req.body.StagesImplementation_Content
        }
      }
    );

    res.json({
      success: true,
      message: "Cập nhật thành công giai đoạn chi phí  khai",
      StagesImplementation: newImplementation_Cost,
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
    /* idcontract,
    idContentCost,
    idCost */
  } = req.body;

  console.log("idcontract==========", req.params.idcontract)
  console.log("idContentCost==========", req.params.idContentCost)
  console.log("idCost", req.params.idCost)
  try {
    if (req.body.Quantity_times == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days
    else if (req.body.Quantity_days == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_times
    else
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times

    const newImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idcontract,
        "GeneralExpense": { $elemMatch: { _id: req.params.idContentCost } },
        //"GeneralExpense.Costs": {$elemMatch : {_id:  req.params.idCost }}
      },
      { // !!!!
        $set: {
          "GeneralExpense.$.Costs.$[elements]": {
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
    Implementation_Cost_Id,
    ContentCostId,
    idCost
  } = req.body;

  console.log("idcontract==========", req.params.idcontract)
  console.log("idContentCost==========", req.params.idContentCost)
  console.log("idCost", req.params.idCost)

  try {
    if (req.body.Quantity_times == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days
    else if (req.body.Quantity_days == 0)
      IntoMoney = req.body.UnitPrice * req.body.Quantity_times
    else
      IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times

    const newImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idcontract,
        "StagesImplementation": { $elemMatch: { _id: req.params.idContentCost } },
        //"StagesImplementation.Costs": {$elemMatch : {_id:  req.params.idCost }}
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


// Delete  Implementation_Cost by id
// @access Public
//ok
exports.deleteImplementation_Cost = async (req, res) => {
  console.log("Test route deleteImplementation_Cost !");
  console.log(req.params.id);
  try {
    const Implementation_CostDeleteCondition = { contract: req.params.id }//, user: req.userId }
    const deletedImplementation_Cost = await Implementation_Cost.findOneAndDelete(Implementation_CostDeleteCondition)

    // User not authorised or Implementation_Cost not found
    if (!deletedImplementation_Cost)
      return res.status(401).json({
        success: false,
        message: 'Implementation_Cost not found or user not authorised'
      })

    res.json({ success: true, message: 'Delete Implementation_Cost Successfull !' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Internal server error' })
  }

}

// Xoa 1 giai doan voi id giaidoan
// @access Public
//ok
exports.deleteImplementation_Cost_ContentCost = async (req, res) => {
  console.log("Test route deleteImplementation_Cost_ContentCost !");
  console.log("ID Giai doan", req.params.idContentCost);
  try {

    const deletedImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost
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

    // User not authorised or Implementation_Cost not found
    if (!deletedImplementation_Cost)
      return res.status(401).json({
        success: false,
        message: 'Implementation_Cost GeneralExpense not found or user not authorised'
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
exports.deleteImplementation_Cost_GeneralCostDetail = async (req, res) => {
  console.log("Test route deleteImplementation_Cost_GeneralCostDetail !");
  console.log("ID Chi phi", req.params.idImplementation_Cost);
  console.log("ID Giai doan", req.params.idContentCost);
  console.log("ID Cost", req.params.id);
  try {

    const deletedImplementation_Cost = await Implementation_Cost.updateOne(
      {
        _id: req.params.idImplementation_Cost,
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

    // User not authorised or Implementation_Cost not found
    if (!deletedImplementation_Cost)
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
exports.deleteImplementation_Cost_StageCostDetail = async (req, res) => {
  console.log("Test route deleteImplementation_Cost_StageCostDetail !");
  console.log("ID Chi phi", req.params.idImplementation_Cost);
  console.log("ID Giai doan", req.params.idContentCost);
  console.log("ID Cost", req.params.id);
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
            _id: req.params.id
          }

        }
      }
    );

    // User not authorised or Implementation_Cost not found
    if (!deletedImplementation_Cost)
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
