const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const AuxiliaryCost = db.AuxiliaryCost;
const ProductCost = db.ProductCost;

//============== Controllers Public Access ==============//

//Get all AuxiliaryCost
//@Access Public
exports.getAllAuxiliaryCost = async (req,res) => {
    console.log("getAllAuxiliaryCost is called")
    try {
      let TotalCPXL_Plan1 = 0;
      let TotalCPgross_Plan1 = 0;
      const AuxiliaryCost_data1 = await AuxiliaryCost.find({Plan: 1}).populate("contract", "-__v")
      for (let i = 0; i < AuxiliaryCost_data1.length; i++){
        TotalCPXL_Plan1 += AuxiliaryCost_data1[i].CPXL;
        TotalCPgross_Plan1 += AuxiliaryCost_data1[i].CPgross;
      }

      let TotalCPXL_Plan2 = 0;
      let TotalCPgross_Plan2 = 0;
      const AuxiliaryCost_data2 = await AuxiliaryCost.find({Plan: 2})//.populate("contract", "-__v")
      for (let i = 0; i < AuxiliaryCost_data2.length; i++){
        TotalCPXL_Plan2 += AuxiliaryCost_data2[i].CPXL;
        TotalCPgross_Plan2 += AuxiliaryCost_data2[i].CPgross;
      }
      let ListTotal = [];
      ListTotal.push(TotalCPXL_Plan1, TotalCPgross_Plan1, TotalCPXL_Plan2, TotalCPgross_Plan2)
      const AuxiliaryCost_data = await AuxiliaryCost.find()//.populate("contract", "-__v")
     
      console.log("Test ====> chi tiet CP vat tu phu",AuxiliaryCost_data, "List tong: ", ListTotal)

      res.json({ success: true, AuxiliaryCost: AuxiliaryCost_data}) 
      
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
// @route GET localhost:5000/api/AuxiliaryCost/getAllAuxiliaryCost
//Get AuxiliaryCost by Id
//@Access Public
exports.getAuxiliaryCost = async (req,res) => {
    console.log("getAllAuxiliaryCost is called")
    try {
      const AuxiliaryCost_data = await AuxiliaryCost.findById({_id: req.params.id})//.populate("contract", "-__v")
      if (AuxiliaryCost_data==null)
      res.json({ success: true, message: "AuxiliaryCost not found !"}) 
      else 
      res.json({ success: true, AuxiliaryCost: AuxiliaryCost_data }) 
      console.log(AuxiliaryCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

// @route GET http://localhost:5000/api/forms/auxiliary-cost/contract/63c1d855ce5c8ecc6ce46069
//Get AuxiliaryCost by idContract
//@Access Public
exports.getAuxiliaryCost_byidContract = async (req,res) => {
    console.log("getAllAuxiliaryCost is called")
    try {
      const AuxiliaryCost_data = await AuxiliaryCost.find({contract: req.params.id})
      if (AuxiliaryCost_data==null)
      res.json({ success: true, message: "AuxiliaryCost not found !"}) 
      else 
      res.json({ success: true, AuxiliaryCost: AuxiliaryCost_data }) 
      console.log(AuxiliaryCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

// @route GET http://localhost:5000/api/forms/auxiliary-cost/contract/63c1d855ce5c8ecc6ce46069/1
//Get AuxiliaryCost by idContract and plan
//@Access Public
exports.getAuxiliaryCost_byidContract_plan = async (req,res) => {
    console.log("getAllAuxiliaryCost is called","idContract" ,req.params.id, "Plan", req.params.plan)

    try {
      const AuxiliaryCost_data = await AuxiliaryCost.find({contract: req.params.id, Plan: req.params.plan})
      if (AuxiliaryCost_data==null)
      res.json({ success: true, message: "AuxiliaryCost not found !"}) 
      else 
      res.json({ success: true, AuxiliaryCost_data: AuxiliaryCost_data })
    
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    
  }



// Insert AuxiliaryCost
// @access Public
// Note: Load Form 1 co loc theo Hop Dong Khong???
//    - Code hien tai Lay het Du lieu Chi tiet hang hoa
//    - De loc theo hop dong thi code them tra ve _id cua req.body.ContractID

exports.insertAuxiliaryCost = async (req, res) => {
    console.log("Test route ===> addAuxiliaryCost is called !");
    //Load Tong gia von va tong doanh thu tu Form1
    const {
        Renevue,
        Plan,
        Content,
        Cost,
        CPXL,
        CPgross,
        Note
    } = req.body

    const newAuxiliaryCost = new AuxiliaryCost({
        Renevue,
        Plan,
        Content,
        Cost,
        CPXL,
        CPgross,
        Note
    })
    console.log("Test data recieved ====>>>",newAuxiliaryCost.Renevue)
    console.log(req.body.ContractID);
    newAuxiliaryCost.Renevue = 0;
    try {
        const ProductCost_data = await ProductCost.find({ contract: req.body.ContractID })
        for (let i = 0; i < ProductCost_data.length; i++) {
            newAuxiliaryCost.Renevue += ProductCost_data[i].OutputIntoMoney;
        }
        console.log("Data newAuxiliaryCost sẽ được thêm >>>>>",newAuxiliaryCost)

        // Xử lý logic chi phí (So tien)
        if(req.body.Cost < 1)
            newAuxiliaryCost.Cost = req.body.Cost * newAuxiliaryCost.Renevue ;
        else
            newAuxiliaryCost.Cost = req.body.Cost;
        
        if(req.body.Plan == 1){
            newAuxiliaryCost.CPXL = newAuxiliaryCost.Cost/0.8*0.2;
            newAuxiliaryCost.CPgross = newAuxiliaryCost.Cost + newAuxiliaryCost.CPXL;
        }
        else{
            newAuxiliaryCost.CPXL = newAuxiliaryCost.Cost/0.75*0.25;
            newAuxiliaryCost.CPgross = newAuxiliaryCost.Cost + newAuxiliaryCost.CPXL;
        }

        console.log("Sau khi load tu Form 1>>>>>>>Revenue: ",newAuxiliaryCost.Renevue);
       
        //Thuc hien luu vao DB voi idContract

        Contract.find({_id: req.body.ContractID },(err,Contract)=>{
        if(Contract.length!=0){
            newAuxiliaryCost.save((err, AuxiliaryCost) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                newAuxiliaryCost.contract = Contract.map(contract => contract._id);
                        newAuxiliaryCost.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            res.json({ success: true,message:  `${req.body.Content} đã được thêm thành công!!!`, AuxiliaryCost: newAuxiliaryCost }) 
                        });
                console.log("Sau khi them >>>>>", AuxiliaryCost)
            });
            

        }
        else 
        res.json({ success: false ,message: `Hợp đồng ${req.body.ContractID} không tồn tại !!!`}) 
        
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}


// update AuxiliaryCost By id
// @access Public
exports.updateAuxiliaryCost = async (req, res) => {
    console.log("Test route ===> addAuxiliaryCost is called !");
    //Load Tong gia von va tong doanh thu tu Form1
    const { 
        Revenue, // Load từ form 1
        Plan, // Lua chon gia tri, M 
        Content,
        Cost, // = if(Cost<1; Cost*CapitalCost ; Cost)
        CPXL,
        CPgross,
        Note,
        contract
    } = req.body

    let updatedAuxiliaryCost ={
        Revenue, // Load từ form 1
        Plan, // Lua chon gia tri, M 
        Content,
        Cost, // = if(Cost<1; Cost*CapitalCost ; Cost)
        CPXL,
        CPgross,
        Note
    }
    console.log("Test data recieved ====>>>",updatedAuxiliaryCost)
    console.log(req.body.ContractID);

    try {
        // Load data tu Form 1: Lay tong gia von va Doanh thu
        const ProductCost_data = await ProductCost.find()//.populate("contract", "-__v")
        updatedAuxiliaryCost.Revenue = 0;
        for (let i = 0; i < ProductCost_data.length; i++) {
            updatedAuxiliaryCost.Revenue += ProductCost_data[i].OutputIntoMoney;
        }
        console.log("Sau khi load tu Form 1>>>>>>> - Revenue: ",updatedAuxiliaryCost.Revenue);
        // So tien
        if(req.body.Cost < 1)
        updatedAuxiliaryCost.Cost = req.body.Cost * updatedAuxiliaryCost.Revenue;
        else
        updatedAuxiliaryCost.Cost = req.body.Cost;
        // CPXL CPGross
        if(req.body.Plan == 1){
            updatedAuxiliaryCost.CPXL = updatedAuxiliaryCost.Cost/0.8*0.2;
            updatedAuxiliaryCost.CPgross = updatedAuxiliaryCost.Cost + updatedAuxiliaryCost.CPXL;
        }
        else{
            updatedAuxiliaryCost.CPXL = updatedAuxiliaryCost.Cost/0.75*0.25;
            updatedAuxiliaryCost.CPgross = updatedAuxiliaryCost.Cost + updatedAuxiliaryCost.CPXL;
        }

       //Thuc hien luu vao DB voi dieu kien theo tung Hop dong
       const UpdateCondition = { _id: req.params.id}

       updatedAuxiliaryCost = await AuxiliaryCost.findOneAndUpdate(
       UpdateCondition,
       updatedAuxiliaryCost, { new: true }
       )
           // User not authorised to update ProductCost or ProductCost not found
           if (!updatedAuxiliaryCost)
               return res.status(401).json({
                   success: false,
                   message: 'AuxiliaryCost not found or user not authorised'
               })
           else
               res.json({
                   success: true,
                   message: 'updated AuxiliaryCost Successfull !',
                   dataUpdate: updatedAuxiliaryCost
               })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

// delete AuxiliaryCost  By id
// @access Public
exports.deleteAuxiliaryCost = async (req, res) => {
    console.log("Test route deleteAuxiliaryCost !");
    console.log(req.params.id);
    try {
        const AuxiliaryCostDeleteCondition = { _id: req.params.id}//, user: req.userId }
        const deletedAuxiliaryCost= await AuxiliaryCost.findOneAndDelete(AuxiliaryCostDeleteCondition)

        // User not authorised or AuxiliaryCost not found
        if (!deletedAuxiliaryCost)
            return res.status(401).json({
                success: false,
                message: 'AuxiliaryCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete AuxiliaryCost Successfull !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

