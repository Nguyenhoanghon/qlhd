const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const ImplementationCost = db.ImplementationCost;

//============== Controllers Public Access ==============//

//Get all ImplementationCost
//@Access Public
// chua test
exports.getAllImplementationCost = async (req,res) => {
    console.log("getAllImplementationCost is called")
    try {
      const ImplementationCost_data = await ImplementationCost.find()//.populate("contract", "-__v")
      
      //Tinh tong ImplementationCost get dc
      /*
      let InputIntoMoney = 0;
      let OutputIntoMoney = 0;
        for (let i = 0; i < ImplementationCost_data.length; i++) {
        console.log(ImplementationCost_data[i].InputIntoMoney)
        InputIntoMoney += ImplementationCost_data[i].InputIntoMoney;
        OutputIntoMoney += ImplementationCost_data[i].OutputIntoMoney;
    }
    */

      res.json({ success: true, ImplementationCost: ImplementationCost_data}) 
      console.log(ImplementationCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }


//Get ImplementationCost By ID ImplementationCost
//@Access Public
// Chua test
  exports.getImplementationCost = async (req,res) => {
      console.log("getAllImplementationCost is called")
      try {
        const ImplementationCost_data = await ImplementationCost.findById(req.params.id).populate("contract", "-__v")
        res.json({ success: true, ImplementationCost: ImplementationCost_data }) 
        console.log(ImplementationCost_data)
    
      } catch (error) {
          console.log(error)
          res.status(500).json({ success: false, message: 'Internal server error' })
      }
    }

//Get ImplementationCost By ID HopDong
//@Access Public
// Chua test
exports.getImplementationCost_IdContract = async (req,res) => {
    console.log("getAllImplementationCost is called")
    try {
      const ImplementationCost_data = await ImplementationCost.find({contract: req.params.id}).populate("contract", "-__v")
      res.json({ success: true, ImplementationCost: ImplementationCost_data }) 
      console.log(ImplementationCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

// Create ImplementationCost add chi phi chung va 1 giai doan chi phi trien khai
// goi ham nay khi trien khai co 1 giai doan
// @access Public


exports.createImplementationCost = async (req, res) => {
    console.log("Test route ===> createImplementationCost is called !");
    
    try {
        
        //Kiem tra hop dong co ton tai?
       Contract.find({_id: req.params.idcontract },(err,Contract)=>{
        if(Contract.length!=0)            
            console.log(">>>>>>>>>>> Find Cotract");    
        else 
            res.json({ success: true ,message: "Not found Contract"})
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

    const { GeneralExpense, StagesImplementation }= req.body;
    if (!GeneralExpense || !StagesImplementation)
        return res.status(400).json({ success: false, message: "Missing GeneralExpense Or StagesImplementation" });
        try {
        const newImplementationCost = await ImplementationCost.findOneAndUpdate(
            {
            contract: req.params.idcontract,
            },
            {
                $push: {
                    GeneralExpense: {
                        Content: GeneralExpense,
                    },
                    StagesImplementation: {
                        Content: StagesImplementation,
                    },
                  },
                contract: req.params.idcontract,
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

// Create ImplementationCost - createGeneralExpense Add them chi phi chung neu can
// @access Public

exports.createGeneralExpense = async (req, res) => {
    console.log("Test route ===> createGeneralExpense is called !");
    try {
        //Kiem tra hop dong co ton tai?
       Contract.find({_id: req.params.idcontract },(err,Contract)=>{
        if(Contract.length!=0)            
            console.log(">>>>>>>>>>> Find Cotract");    
        else 
            res.json({ success: true ,message: "Not found Contract"})
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

    const { Content }= req.body;
    if (!Content)
        return res.status(400).json({ success: false, message: "Missing noidung" });
        try {
        const newImplementationCost = await ImplementationCost.findOneAndUpdate(
            {
            contract: req.params.idcontract,
            },
            {
                $push: {
                    GeneralExpense: {
                        Content,
                    },
                  },
                contract: req.params.idcontract,
                user: req.userId,
            },
            {
            new: true,
            upsert: true,
            }
        );
    
        res.json({
            success: true,
            message: "Đã thêm chi phí Chung",
            ImplementationCost: newImplementationCost,
        });
        } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
        }
}

// Create ImplementationCost -> createStagesImplementation neu co them giai doan
// @access Public

exports.createStagesImplementation = async (req, res) => {
    console.log("Test route ===> createStagesImplementation is called !");
    try {
        //Kiem tra hop dong co ton tai?
       Contract.find({_id: req.params.idcontract },(err,Contract)=>{
        if(Contract.length!=0)            
            console.log(">>>>>>>>>>> Find Cotract");    

        else 
            res.json({ success: true ,message: "Not found Contract"})
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

    const { Content }= req.body;
    if (!Content)
        return res.status(400).json({ success: false, message: "Missing noidung" });
        try {
        const newImplementationCost = await ImplementationCost.findOneAndUpdate(
            {
            contract: req.params.idcontract,
            },
            {
                $push: {
                    StagesImplementation: {
                        Content,
                    },
                  },
                contract: req.params.idcontract,
                user: req.userId,
            },
            {
            new: true,
            upsert: true,
            }
        );
    
        res.json({
            success: true,
            message: "Đã thêm StagesImplementation",
            ImplementationCost: newImplementationCost,
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
    //console.log(chiphi);
    try {
        if(req.body.Quantity_times == 0)
            IntoMoney = req.body.UnitPrice * req.body.Quantity_days
        else if(req.body.Quantity_days == 0)
            IntoMoney = req.body.UnitPrice * req.body.Quantity_times
            else
             IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times
        
        const newImplementationCost = await ImplementationCost.findOneAndUpdate(
          {
            _id: ImplementationCost_Id,
            "GeneralExpense._id": ContentCostId, //nhan tu tham so
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
    //console.log(chiphi);
    try {
        if(req.body.Quantity_times == 0)
            IntoMoney = req.body.UnitPrice * req.body.Quantity_days
        else if(req.body.Quantity_days == 0)
            IntoMoney = req.body.UnitPrice * req.body.Quantity_times
            else
             IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times
        
        const newImplementationCost = await ImplementationCost.findOneAndUpdate(
          {
            _id: ImplementationCost_Id,
            "StagesImplementation._id": ContentCostId, //nhan tu tham so
          },
          {
            $push: {
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

// Update ImplementationCost GeneralExpense
// @access Public
exports.updateImplementationCost_CostGeneralExpense = async (req, res) => {
    console.log("Test route updateImplementationCost !");

    const { 
        NameCost,
        Units,
        UnitPrice,
        Quantity_days,
        Quantity_times,
        IntoMoney,
        Note,
        ImplementationCost_Id,
        ContentCostId
    } = req.body

    console.log("Test data recieved ====>>>",req.params.id)
    try {
        let updateImplementationCost = {
            NameCost,
            Units,
            UnitPrice,
            Quantity_days,
            Quantity_times,
            IntoMoney,
            Note,
            ImplementationCost_Id,
            ContentCostId
        }
        console.log("Test data get form =====>>>",updateImplementationCost)
        //xu ly logic dữ liệu
        if(req.body.Quantity_times == 0)
        updateImplementationCost.IntoMoney = req.body.UnitPrice * req.body.Quantity_days
        else if(req.body.Quantity_days == 0)
        updateImplementationCost.IntoMoney = req.body.UnitPrice * req.body.Quantity_times
            else
            updateImplementationCost.IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times
         
        console.log("Test data sau xu ly logic =====>>>",updateImplementationCost)

        //const UpdateCondition = { _id: req.params.id}
        updateImplementationCost = await ImplementationCost.findOneAndUpdate(
            {
            _id: ImplementationCost_Id,
            "GeneralExpense._id": ContentCostId,
            "GeneralExpense.Costs._id": req.params.id
          },
          {
            $set: {
              "GeneralExpense.$.Costs": {
                NameCost,
                Units,
                UnitPrice,
                Quantity_days,
                Quantity_times,
                IntoMoney,
                Note
              },
            }
          },
          {
            new: true,
            upsert: true,
          }
        );
            // User not authorised to update ImplementationCost or ImplementationCost not found
            if (!updateImplementationCost)
                return res.status(401).json({
                    success: false,
                    message: 'ImplementationCost not found or user not authorised'
                })
            else
                res.json({
                    success: true,
                    message: 'Update ImplementationCost Successfull !',
                    updateImplementationCost: updateImplementationCost
                })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }

}

// Update ImplementationCost StageImplementation costs
// @access Public
exports.updateImplementationCost_CostDetailStage = async (req, res) => {
    console.log("Test route updateImplementationCost !");

    const { 
        NameCost,
        Units,
        UnitPrice,
        Quantity_days,
        Quantity_times,
        IntoMoney,
        Note,
        ImplementationCost_Id,
        ContentCostId
    } = req.body

    console.log("Test data recieved ====>>>",req.params.id)
    try {
        let updateImplementationCost = {
            NameCost,
            Units,
            UnitPrice,
            Quantity_days,
            Quantity_times,
            IntoMoney,
            Note,
            ImplementationCost_Id,
            ContentCostId
        }
        console.log("Test data get form =====>>>",updateImplementationCost)
        //xu ly logic dữ liệu
        if(req.body.Quantity_times == 0)
        updateImplementationCost.IntoMoney = req.body.UnitPrice * req.body.Quantity_days
        else if(req.body.Quantity_days == 0)
        updateImplementationCost.IntoMoney = req.body.UnitPrice * req.body.Quantity_times
            else
            updateImplementationCost.IntoMoney = req.body.UnitPrice * req.body.Quantity_days * req.body.Quantity_times
         
        console.log("Test data sau xu ly logic =====>>>",updateImplementationCost)

        //const UpdateCondition = { _id: req.params.id}
        updateImplementationCost = await ImplementationCost.findOneAndUpdate(
            {
            _id: ImplementationCost_Id,
            "StagesImplementation._id": ContentCostId,
            "StagesImplementation.Costs._id": req.params.id
          },
          {
            $set: {
              "StagesImplementation.$.Costs": {
                NameCost,
                Units,
                UnitPrice,
                Quantity_days,
                Quantity_times,
                IntoMoney,
                Note
              },
            }
          },
          {
            new: true,
            upsert: true,
          }
        );
            // User not authorised to update ImplementationCost or ImplementationCost not found
            if (!updateImplementationCost)
                return res.status(401).json({
                    success: false,
                    message: 'ImplementationCost not found or user not authorised'
                })
            else
                res.json({
                    success: true,
                    message: 'Update ImplementationCost Successfull !',
                    updateImplementationCost: updateImplementationCost
                })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }

}
// Delete ImplementationCost by id
// @access Public
exports.deleteImplementationCost = async (req, res) => {
    console.log("Test route deleteImplementationCost !");
    console.log(req.params.id);
    try {
        const ImplementationCostDeleteCondition = { _id: req.params.id}//, user: req.userId }
        const deletedImplementationCost= await ImplementationCost.findOneAndDelete(ImplementationCostDeleteCondition)

        // User not authorised or ImplementationCost not found
        if (!deletedImplementationCost)
            return res.status(401).json({
                success: false,
                message: 'ImplementationCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete ImplementationCost Successfull !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

// Delete ImplementationCost by id Costs General
// @access Public
exports.deleteImplementationCost_Stage = async (req, res) => {
    console.log("Test route deleteImplementationCost !");
    console.log(req.params.id);
    try {
        const ImplementationCostDeleteCondition = {
            _id: ImplementationCost_Id,
            "StagesImplementation._id": ContentCostId,
            "StagesImplementation.Costs._id": req.params.id
          }//, user: req.userId }
        const deletedImplementationCost= await ImplementationCost.findOneAndDelete(ImplementationCostDeleteCondition)

        // User not authorised or ImplementationCost not found
        if (!deletedImplementationCost)
            return res.status(401).json({
                success: false,
                message: 'ImplementationCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete ImplementationCost Successfull !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

//================== cac ham chuc nang ================================//
//Get all ImplementationCost by Contract
//@Access Public
exports.getImplementationCost_ContractID = async (req,res) => {
    console.log("getImplementationCost_Contract is called >>>>", req.params.contractName)
    try {
      const ImplementationCost_data = await ImplementationCost.find({contract: req.params.contractName},)//.populate("contract", "-__v")
      let InputIntoMoney = 0;
      let OutputIntoMoney = 0;
        for (let i = 0; i < ImplementationCost_data.length; i++) {
        console.log(ImplementationCost_data[i].InputIntoMoney)
        InputIntoMoney += ImplementationCost_data[i].InputIntoMoney;
        OutputIntoMoney += ImplementationCost_data[i].OutputIntoMoney;
    }
    console.log(">>>>>>>tong",InputIntoMoney,"-",OutputIntoMoney);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    
  }