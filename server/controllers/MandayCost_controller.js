const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const MandayCost = db.MandayCost;

//============== Controllers Public Access ==============//

// @route GET localhost:5000/api/MandayCost/getAllMandayCost
//Get all MandayCost
//@Access Public
exports.getAllMandayCost = async (req,res) => {
    console.log("getAllMandayCost is called")
    try {
      const MandayCost_data = await MandayCost.find()//.populate("contract", "-__v")
      res.json({ success: true, MandayCost: MandayCost_data }) 
      console.log(MandayCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
// @route GET localhost:5000/api/MandayCost/getAllMandayCost
//Get MandayCost by Id
//@Access Public
exports.getMandayCost = async (req,res) => {
    console.log("getAllMandayCost is called")
    try {
      const MandayCost_data = await MandayCost.findById(req.params.id).populate("contract", "-__v")
      if (MandayCost_data==null)
      res.json({ success: true, message: "MandayCost not found !"}) 
      else 
      res.json({ success: true, MandayCost: MandayCost_data }) 
      console.log(MandayCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

// @route POST localhost:5000/api/MandayCost/insertMandayCost
// @access Public

exports.insertMandayCost = async (req, res) => {
    //console.log("Test route ===> addMandayCost is called !");
    const { 
        RatioUSD,
        Department,
        Cost,
        StaffNumber,
        ImplementationDay,
        IntoMoney,
        Note,
        contract
    } = req.body

    const newMandayCost = new MandayCost({
        RatioUSD,
        Department,
        Cost,
        StaffNumber,
        ImplementationDay,
        IntoMoney,
        Note
    })
    console.log("Test data recieved ====>>>",req.body.ContractID)
    
    try {
       Contract.find({ContractID: req.body.ContractID },(err,Contract)=>{
        if(Contract.length!=0){
            newMandayCost.IntoMoney = req.body.Cost * req.body.RatioUSD * req.body.StaffNumber * req.body.ImplementationDay;
            newMandayCost.save((err, MandayCost) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                newMandayCost.contract = Contract.map(contract => contract._id);
                        newMandayCost.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            res.json({ success: true,message:  'MandayCost was registered successfully!', MandayCost: newMandayCost }) 
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


// @route Put localhost:5000/api/MandayCost/updateMandayCost/:id
// @access Public
exports.updateMandayCost = async (req, res) => {
    console.log("Test route updateMandayCost !");
    const { 
        RatioUSD,
        Department,
        Cost,
        StaffNumber,
        ImplementationDay,
        IntoMoney,
        Note,
        contract
    } = req.body

    console.log("Test data recieved ====>>>",req.params.id)

    try {
        let updatedMandayCost = {
            RatioUSD,
            Department,
            Cost,
            StaffNumber,
            ImplementationDay,
            IntoMoney,
            Note
        }
        updatedMandayCost.IntoMoney = req.body.Cost * req.body.RatioUSD * req.body.StaffNumber * req.body.ImplementationDay;
        const UpdateCondition = { _id: req.params.id}
        updatedMandayCost = await MandayCost.findOneAndUpdate(
            UpdateCondition,
            updatedMandayCost, { new: true }
        )
        // User not authorised to update MandayCost or MandayCost not found
        if (!updatedMandayCost)
            return res.status(401).json({
                success: false,
                message: 'MaydayCost not found or user not authorised'
            })
        else
            res.json({
                success: true,
                message: 'Update MaydayCost Successfull !',
                dataUpdate: updatedMandayCost
            })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }
}

// @route Delete localhost:5000/api/MandayCost/deleteMandayCost/:id
// @access Public
exports.deleteMandayCost = async (req, res) => {
    console.log("Test route deleteMandayCost !");
    console.log(req.params.id);
    try {
        const MandayCostDeleteCondition = { _id: req.params.id}//, user: req.userId }
        const deletedMandayCost= await MandayCost.findOneAndDelete(MandayCostDeleteCondition)

        // User not authorised or MandayCost not found
        if (!deletedMandayCost)
            return res.status(401).json({
                success: false,
                message: 'MandayCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete MandayCost Successfull !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

