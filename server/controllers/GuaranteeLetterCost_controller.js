const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const GuaranteeLetterCost = db.GuaranteeLetterCost;

//============== Controllers Public Access ==============//


// Create GuaranteeLetterCost
// @access Public
exports.insertGuaranteeLetterCost = async (req, res) => {
    //console.log("Test route ===> addGuaranteeLetterCost is called !");
    const { 
        Content,//: String,
        Cost,//: Number,
        QuantityMonths,//: Number,
        RatioCost,//: Number,
        IntoMoney,//: Number,
        Note,//: String,
        contract
    } = req.body

    const newGuaranteeLetterCost = new GuaranteeLetterCost({
        Content,//: String,
        Cost,//: Number,
        QuantityMonths,//: Number,
        RatioCost,//: Number,
        IntoMoney,//: Number,
        Note
    })
    console.log("Test data recieved ====>>>",req.body.ContractID)
    
    try {
       Contract.find({ContractID: req.body.ContractID },(err,Contract)=>{
        if(Contract.length!=0){
            newGuaranteeLetterCost.IntoMoney = (req.body.Cost * req.body.RatioCost * req.body.QuantityMonths)/12;
            newGuaranteeLetterCost.save((err, GuaranteeLetterCost) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                newGuaranteeLetterCost.contract = Contract.map(contract => contract._id);
                        newGuaranteeLetterCost.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            console.log(newGuaranteeLetterCost);///test
                            res.json({ success: true, message: "Thêm thành công thư bảo lãnh !! ", GuaranteeLetterCost: newGuaranteeLetterCost }) 
                        });
            });
        }
        else {
            console.log("Hop dong kg ton tai") ///test
            res.json({ success: false, message: `Hợp đồng ${req.body.ContractID} không tồn tại !!!`, GuaranteeLetterCost: newGuaranteeLetterCost })
        }
        
        
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


//Get all GuaranteeLetterCost
//@Access Public
exports.getAllGuaranteeLetterCost = async (req,res) => {
    console.log("getAllGuaranteeLetterCost is called")
    try {
      const GuaranteeLetterCost_data = await GuaranteeLetterCost.find()//.populate("contract", "-__v")
      res.json({ success: true, GuaranteeLetterCost: GuaranteeLetterCost_data }) 
      console.log(GuaranteeLetterCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
//Get GuaranteeLetterCost by id
//@Access Public
exports.getGuaranteeLetterCost = async (req,res) => {
    console.log("getGuaranteeLetterCost is called")
    try {
      const GuaranteeLetterCost_data = await GuaranteeLetterCost.findById({_id: req.params.id})//.populate("contract", "-__v")
      if (GuaranteeLetterCost_data==null)
            res.json({ success: true, message: "GuaranteeLetterCost not found !"}) 
      else 
      res.json({ success: true, message: "GuaranteeLetterCost ", GuaranteeLetterCost: GuaranteeLetterCost_data })

        console.log(GuaranteeLetterCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
// Update GuaranteeLetterCost
// @access Public
exports.updateGuaranteeLetterCost = async (req, res) => {
    console.log("Test route update GuaranteeLetterCost !");
    const { 
        Content,//: String,
        Cost,//: Number,
        QuantityMonths,//: Number,
        RatioCost,//: Number,
        IntoMoney,//: Number,
        Note,//: String,
        contract
    } = req.body

    console.log("Test data recieved ====>>>",req.params.id)

    try {
        let updatedGuaranteeLetterCost = {
            Content,//: String,
            Cost,//: Number,
            QuantityMonths,//: Number,
            RatioCost,//: Number,
            IntoMoney,//: Number,
            Note
        }
        updatedGuaranteeLetterCost.IntoMoney = (req.body.Cost * req.body.RatioCost * req.body.QuantityMonths)/12;

        const UpdateCondition = { _id: req.params.id}
        updatedGuaranteeLetterCost = await GuaranteeLetterCost.findOneAndUpdate(
            UpdateCondition,
            updatedGuaranteeLetterCost, { new: true }
        )
        // User not authorised to update GuaranteeLetterCost or GuaranteeLetterCost not found
        if (!updatedGuaranteeLetterCost)
            return res.status(401).json({
                success: false,
                message: 'Contract not found or user not authorised'
            })
        else
            res.json({
                success: true,
                message: `Cập nhật thành công!`,
                updatedGuaranteeLetterCost: updatedGuaranteeLetterCost
            })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }
}


// Delete GuaranteeLetterCost by id
// @access Public
exports.deleteGuaranteeLetterCost = async (req, res) => {
    console.log("Test route deleteGuaranteeLetterCost !");
    console.log(req.params.id);
    try {
        const GuaranteeLetterCostDeleteCondition = { _id: req.params.id}
        const deletedGuaranteeLetterCost= await GuaranteeLetterCost.findOneAndDelete(GuaranteeLetterCostDeleteCondition)

        // User not authorised or GuaranteeLetterCost not found
        if (!deletedGuaranteeLetterCost)
            return res.status(401).json({
                success: false,
                message: 'GuaranteeLetterCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete GuaranteeLetterCost Successfull !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

//================== cac ham chuc nang ================================//
//Get  GuaranteeLetterCost by idContract
//@Access Public
exports.getGuaranteeLetterCost_ContractID = async (req,res) => {
    console.log("geGuaranteeLetterCost_Contract is called >>>>", req.params.idContract)
    try {
      const GuaranteeLetterCost_data = await GuaranteeLetterCost.find({contract: req.params.idContract},).populate("contract", "-__v")
    console.log("==========",GuaranteeLetterCost_data)
    res.json({ success: true, GuaranteeLetterCost: GuaranteeLetterCost_data }) 
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    
  }