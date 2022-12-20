const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const GuaranteeLetterCost = db.GuaranteeLetterCost;

//============== Controllers Public Access ==============//

// @route GET localhost:5000/api/GuaranteeLetterCost/getAllGuaranteeLetterCost
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

// @route POST localhost:5000/api/GuaranteeLetterCost/insertGuaranteeLetterCost
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
                            res.json({ success: true,message: "Contract was registered successfully! ---IF", GuaranteeLetterCost: newGuaranteeLetterCost }) 
                        });
            });
        }
        else 
        res.json({ success: false ,message: "Not found Contract "}) 
        
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


// @route Put localhost:5000/api/GuaranteeLetterCost/updateGuaranteeLetterCost/:id
// @access Public
exports.updateGuaranteeLetterCost = async (req, res) => {
    console.log("Test route updateGuaranteeLetterCost !");
    //res.json({ success: true ,message: "Test route updateGuaranteeLetterCost"}) 
     //test route Update
    //res.status(200).send(" Test Routes Update updateGuaranteeLetterCost");
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
                message: 'Update Contract Successfull !',
                dataUpdate: updatedGuaranteeLetterCost
            })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }
}

// @route Delete localhost:5000/api/GuaranteeLetterCost/deleteGuaranteeLetterCost/:id
// @access Public
exports.deleteGuaranteeLetterCost = async (req, res) => {
    console.log("Test route deleteGuaranteeLetterCost !");
    console.log(req.params.id);
    try {
        const GuaranteeLetterCostDeleteCondition = { _id: req.params.id}//, user: req.userId }
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

// @route Get localhost:5000/api/GuaranteeLetterCost/check
// @access Public
exports.check = async (req, res) => {
    console.log("Test route !");
    res.json({ success: true ,message: "Test route"}) 

    GuaranteeLetterCost.find({_id: req.params.id },(err,GuaranteeLetterCost)=>{
        if(!GuaranteeLetterCost){
            console.log("Thoa điêuf kiện",GuaranteeLetterCost)
        }
        else{
            console.log("Id Chi phí not found")
        }
    });

}
