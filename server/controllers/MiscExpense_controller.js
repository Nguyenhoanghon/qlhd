const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = db.user;
const Contract = db.Contract;
const MiscExpense = db.MiscExpense;

//============== Controllers Public Access ==============//

// Create MiscExpense By Number Contract
// @access Public
exports.addMiscExpenseCost = async (req, res) => {
    //console.log("Test route ===> addMiscExpense is called !");
    const { 
        Content,
        Cost,
        Note,
        ContractID
    } = req.body

    const newMiscExpense = new MiscExpense({
        Content,
        Cost,
        Note, 
        ContractID
    })
    console.log("Test data recieved ====>>>",req.body.ContractID)
    console.log("Test data recieved ====>>>",req.body.newMiscExpense)
    
    try {
       Contract.find({_id: req.body.ContractID },(err,Contract)=>{
        //Console.log("Test Id contract===",Contract._id)
        if(Contract.length!=0){
            newMiscExpense.save((err, MiscExpense) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                newMiscExpense.contract = Contract.map(contract => contract._id);
                        newMiscExpense.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            res.json({ success: true , message: "Thêm chi phí khác thành công!", MiscExpense: newMiscExpense }) 
                        });
                        
            });
        }
        else 
        res.json({ success: false ,message: `Hợp đồng ${req.body.ContractID} không tồn tại !!!`, MiscExpense: newMiscExpense}) 
        
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


//Get all MiscExpense
//@Access Public
exports.getAllMiscExpense = async (req,res) => {
    console.log("getAllMiscExpense is called")
    try {
      const MiscExpense_data = await MiscExpense.find().populate("contract", "-__v")
      res.json({ success: true, MiscExpense: MiscExpense_data }) 
      console.log(MiscExpense_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

//Get MiscExpense by id
//@Access Public
exports.getMiscExpense = async (req,res) => {
    console.log("getMiscExpense is called")
    try {
      const MiscExpense_data = await MiscExpense.findById(req.params.id).populate("contract", "-__v")
      console.log(req.params.id);
      res.json({ success: true,message: 'MiscExpense not Found', MiscExpense: MiscExpense_data }) 
      console.log(MiscExpense_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
  //Get MiscExpense by id HD
//@Access Public
exports.getMiscExpense_ContractID = async (req,res) => {
    console.log("getMiscExpense is called")
    try {
      const MiscExpense_data = await MiscExpense.find({contract: req.params.id}).populate("contract", "-__v")
      console.log(req.params.idHD);
      res.json({ success: true,message: 'MiscExpense not Found', MiscExpense: MiscExpense_data }) 
      console.log(MiscExpense_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }


// Update MiscExpense by id
// @access Public
exports.updateMiscExpense = async (req, res) => {
    console.log("Test route updateMiscExpense !");
    console.log("Test data recieved ====>>>",req.params.id)
    const { 
        Content,
        Cost,
        Note
    } = req.body
    try {
        let updatedMiscExpense = {
            Content,
            Cost,
            Note
        }
        const UpdateCondition = { _id: req.params.id}
        updatedMiscExpense = await MiscExpense.findOneAndUpdate(
            UpdateCondition,
            updatedMiscExpense, { new: true }
        )
        // User not authorised to update MiscExpense or MiscExpense not found
        if (!updatedMiscExpense)
            return res.status(401).json({
                success: false,
                message: `MiscExpense not found or user not authorised`
            })
        else
            res.json({
                success: true,
                message: 'Cập nhật thành công !',
                updatedMiscExpense: updatedMiscExpense
            })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }
}

// Delete MiscExpense
// @access Public
exports.deleteMiscExpense = async (req, res) => {
    console.log("Test route deleteMiscExpense !");
    console.log(req.params.id);
    try {
        const MiscExpenseDeleteCondition = { _id: req.params.id}//, user: req.userId }
        const deletedMiscExpense= await MiscExpense.findOneAndDelete(MiscExpenseDeleteCondition)

        // User not authorised or MiscExpense not found
        if (!deletedMiscExpense)
            return res.status(401).json({
                success: false,
                message: 'MiscExpense not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete MiscExpense Successfull !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}


