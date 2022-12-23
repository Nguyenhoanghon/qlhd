const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const ProductCost = db.ProductCost;

//============== Controllers Public Access ==============//

// @route GET localhost:5000/api/ProductCost/getAllProductCost
//Get all ProductCost
//@Access Public
exports.getAllProductCost = async (req,res) => {
    console.log("getAllProductCost is called")
    try {
      const ProductCost_data = await ProductCost.find()//.populate("contract", "-__v")
      res.json({ success: true, ProductCost: ProductCost_data }) 
      console.log(ProductCost_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

// @route POST localhost:5000/api/ProductCost/insertProductCost
// @access Public

exports.insertProductCost = async (req, res) => {
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
    console.log("Test data recieved ====>>>",req.body.ContractID)
    
    try {
        //Kiem tra hop dong co ton tai?
       Contract.find({ContractID: req.body.ContractID },(err,Contract)=>{
        if(Contract.length!=0){
            //xu ly logic
            if(req.body.EX_W == true){
                console.log("Nhap tu nnuoc ngoai");
            }
            else 
                console.log("NHap trong uoc");
            
            /*

            newProductCost.IntoMoney = req.body.Cost * req.body.RatioUSD * req.body.StaffNumber * req.body.ImplementationDay;
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
                            res.json({ success: true,message:  'ProductCost was registered successfully! ---IF', ProductCost: newProductCost }) 
                        });
            });
            */
        }
        else 
        res.json({ success: false ,message: "Not found Contract "}) 
        
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}


// @route Put localhost:5000/api/ProductCost/updateProductCost/:id
// @access Public
exports.updateProductCost = async (req, res) => {
    console.log("Test route updateProductCost !");
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
        let updatedProductCost = {
            RatioUSD,
            Department,
            Cost,
            StaffNumber,
            ImplementationDay,
            IntoMoney,
            Note
        }
        updatedProductCost.IntoMoney = req.body.Cost * req.body.RatioUSD * req.body.StaffNumber * req.body.ImplementationDay;
        const UpdateCondition = { _id: req.params.id}
        updatedProductCost = await ProductCost.findOneAndUpdate(
            UpdateCondition,
            updatedProductCost, { new: true }
        )
        // User not authorised to update ProductCost or ProductCost not found
        if (!updatedProductCost)
            return res.status(401).json({
                success: false,
                message: 'MaydayCost not found or user not authorised'
            })
        else
            res.json({
                success: true,
                message: 'Update MaydayCost Successfull !',
                dataUpdate: updatedProductCost
            })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }
}

// @route Delete localhost:5000/api/ProductCost/deleteProductCost/:id
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

