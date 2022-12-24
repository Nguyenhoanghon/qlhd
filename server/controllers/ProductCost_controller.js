const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const ProductCost = db.ProductCost;

//============== Controllers Public Access ==============//

//Get all ProductCost
//@Access Public
exports.getAllProductCost = async (req,res) => {
    console.log("getAllProductCost is called")
    try {
      const ProductCost_data = await ProductCost.find().populate("contract", "-__v")
      
      //Tinh tong ProductCost get dc
      let InputIntoMoney = 0;
      let OutputIntoMoney = 0;
        for (let i = 0; i < ProductCost_data.length; i++) {
        console.log(ProductCost_data[i].InputIntoMoney)
        InputIntoMoney += ProductCost_data[i].InputIntoMoney;
        OutputIntoMoney += ProductCost_data[i].OutputIntoMoney;
    }
    

      res.json({ success: true, ProductCost: ProductCost_data, CapitalCost: InputIntoMoney, Reneveu: OutputIntoMoney   }) 
      console.log(ProductCost_data)
      console.log(">>>>>>>tong",InputIntoMoney,"-",OutputIntoMoney);
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }
  //Get ProductCost By id
  //@Access Public
  exports.getProductCost = async (req,res) => {
      console.log("getAllProductCost is called")
      try {
        const ProductCost_data = await ProductCost.findById(req.params.id).populate("contract", "-__v")
        res.json({ success: true, ProductCost: ProductCost_data }) 
        console.log(ProductCost_data)
    
      } catch (error) {
          console.log(error)
          res.status(500).json({ success: false, message: 'Internal server error' })
      }
    }
// Create ProductCost
// @access Public

exports.createProductCost = async (req, res) => {
    //console.log("Test route ===> addProductCost is called !");
    const { 
        ProductName,
        Quantity,
        EX_W, // nhap tu nuoc ngoai = true
        FOBCost, //if(EX_W = =true, req.body.FOBCost, 0)
        RatioUSD, //if(EX_W = =true, req.body.RatioUSD, 0)
        InputPrice, // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
        OutputPrice, // Nhap
        InputIntoMoney, // Can tinh  = Quantity * InputPrice
        OutputIntoMoney, //Can tinh =  Quantity * OutputPrice
        Insurance,
        Incentive,
        Note,
        contract
    } = req.body

    const newProductCost = new ProductCost({
        ProductName,
        Quantity,
        EX_W, // nhap tu nuoc ngoai = true
        FOBCost, //if(EX_W = =true, req.body.FOBCost, 0)
        RatioUSD, //if(EX_W = =true, req.body.RatioUSD, 0)
        InputPrice, // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
        OutputPrice, // Nhap
        InputIntoMoney, // Can tinh  = Quantity * InputPrice
        OutputIntoMoney, //Can tinh =  Quantity * OutputPrice
        Insurance,
        Incentive,
        Note
    })
    console.log("Test data recieved ====>>>",newProductCost)
    
    try {
        //Kiem tra hop dong co ton tai?
       Contract.find({ContractID: req.body.ContractID },(err,Contract)=>{
        if(Contract.length!=0){                
            //xu ly logic
            if(req.body.EX_W == 1){ 
                console.log("Nhap tu nnuoc ngoai");
                newProductCost.InputPrice = req.body.FOBCost * req.body.RatioUSD;
                newProductCost.InputIntoMoney = newProductCost.InputPrice * newProductCost.Quantity;
                newProductCost.OutputIntoMoney = req.body.OutputPrice * newProductCost.Quantity;
                newProductCost.save((err, ProductCost) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    newProductCost.contract = Contract.map(contract => contract._id);///???
                            newProductCost.save(err => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }
                                res.json({ success: true,message:  'ProductCost was registered successfully! nhp tu nuoc ngoai', ProductCost: newProductCost }) 
                            });
                });
                console.log(">>>>>>>>>>>.trong IF",newProductCost);
            }
            else 
            {
                console.log("NHap trong nuoc");
                newProductCost.FOBCost = 0;
                newProductCost.RatioUSD =0;
                newProductCost.InputPrice = req.body.InputPrice
                newProductCost.InputIntoMoney = newProductCost.InputPrice * newProductCost.Quantity;
                newProductCost.OutputIntoMoney = req.body.OutputPrice * newProductCost.Quantity;
                newProductCost.save((err, ProductCost) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    newProductCost.contract = Contract.map(contract => contract._id);
                            newProductCost.save(err => {
                                if (err) {
                                    res.status(500).send({ message: err });
                                    return;
                                }
                                res.json({ success: true,message:  'ProductCost was registered successfully! Nhap trong nuoc', ProductCost: newProductCost }) 
                            });
                });
            }   
        }
        else 
        res.json({ success: false ,message: "Not found Contract "}) 
        
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

// Update ProductCost
// @access Public
exports.updateProductCost = async (req, res) => {
    console.log("Test route updateProductCost !");

    const { 
        ProductName,
        Quantity,
        EX_W, // nhap tu nuoc ngoai = true
        FOBCost, //if(EX_W = =true, req.body.FOBCost, 0)
        RatioUSD, //if(EX_W = =true, req.body.RatioUSD, 0)
        InputPrice, // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
        OutputPrice, // Nhap
        InputIntoMoney, // Can tinh  = Quantity * InputPrice
        OutputIntoMoney, //Can tinh =  Quantity * OutputPrice
        Insurance,
        Incentive,
        Note,
        contract
    } = req.body

    console.log("Test data recieved ====>>>",req.params.id)

    try {
        let updateProductCost = {
            ProductName,
            Quantity,
            EX_W, // nhap tu nuoc ngoai = true
            FOBCost, //if(EX_W = =true, req.body.FOBCost, 0)
            RatioUSD, //if(EX_W = =true, req.body.RatioUSD, 0)
            InputPrice, // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
            OutputPrice, // Nhap
            InputIntoMoney, // Can tinh  = Quantity * InputPrice
            OutputIntoMoney, //Can tinh =  Quantity * OutputPrice
            Insurance,
            Incentive,
            Note
        }
        //xu ly logic quy trinh
        if(req.body.EX_W == 1){ 
            console.log("Nhap tu nnuoc ngoai");
            updateProductCost.InputPrice = req.body.FOBCost * req.body.RatioUSD;
            updateProductCost.InputIntoMoney = updateProductCost.InputPrice * updateProductCost.Quantity;
            updateProductCost.OutputIntoMoney = req.body.OutputPrice * updateProductCost.Quantity;
            
            const UpdateCondition = { _id: req.params.id}
            updateProductCost = await ProductCost.findOneAndUpdate(
            UpdateCondition,
            updateProductCost, { new: true }
            )
                // User not authorised to update ProductCost or ProductCost not found
                if (!updateProductCost)
                    return res.status(401).json({
                        success: false,
                        message: 'ProductCost not found or user not authorised'
                    })
                else
                    res.json({
                        success: true,
                        message: 'Update MaydayCost Successfull !',
                        dataUpdate: updateProductCost
                    })
        
        }
        else
        {
            console.log("NHap trong nuoc");
            updateProductCost.FOBCost = 0;
            updateProductCost.RatioUSD = 0;
            updateProductCost.InputPrice = req.body.InputPrice
            updateProductCost.InputIntoMoney = updateProductCost.InputPrice * updateProductCost.Quantity;
            updateProductCost.OutputIntoMoney = req.body.OutputPrice * updateProductCost.Quantity;
            const UpdateCondition = { _id: req.params.id}
            updateProductCost = await ProductCost.findOneAndUpdate(
            UpdateCondition,
            updateProductCost, { new: true }
            )
                // User not authorised to update ProductCost or ProductCost not found
                if (!updateProductCost)
                    return res.status(401).json({
                        success: false,
                        message: 'ProductCost not found or user not authorised'
                    })
                else
                    res.json({
                        success: true,
                        message: 'Update ProductCost Successfull !',
                        dataUpdate: updateProductCost
                    })

        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }

}

// Delete ProductCost by id
// @access Public
exports.deleteProductCost = async (req, res) => {
    console.log("Test route deleteProductCost !");
    console.log(req.params.id);
    try {
        const ProductCostDeleteCondition = { _id: req.params.id}//, user: req.userId }
        const deletedProductCost= await ProductCost.findOneAndDelete(ProductCostDeleteCondition)

        // User not authorised or ProductCost not found
        if (!deletedProductCost)
            return res.status(401).json({
                success: false,
                message: 'ProductCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete ProductCost Successfull !'})
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

//================== cac ham chuc nang ================================//
//Get all ProductCost by Contract
//@Access Public
exports.getProductCost_ContractID = async (req,res) => {
    console.log("getProductCost_Contract is called >>>>", req.params.contractName)
    try {
      const ProductCost_data = await ProductCost.find({contract: req.params.contractName},)//.populate("contract", "-__v")
      let InputIntoMoney = 0;
      let OutputIntoMoney = 0;
        for (let i = 0; i < ProductCost_data.length; i++) {
        console.log(ProductCost_data[i].InputIntoMoney)
        InputIntoMoney += ProductCost_data[i].InputIntoMoney;
        OutputIntoMoney += ProductCost_data[i].OutputIntoMoney;
    }
    console.log(">>>>>>>tong",InputIntoMoney,"-",OutputIntoMoney);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    
  }