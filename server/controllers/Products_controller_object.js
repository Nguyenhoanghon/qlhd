const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = require('../models/User_Model');
const Contract = db.Contract;
const Products = db.Products;

//============== Controllers Public Access ==============//

//Get all Products
//@Access Public
// need prepair
exports.getAllProducts = async (req, res) => {
    console.log("getAllProducts is called")
    try {
        const Products_data = await Products.find()//.populate("contract", "-__v")

        //Tinh tong Products get dc
        let InputIntoMoney = 0;
        let OutputIntoMoney = 0;
        for (let i = 0; i < Products_data.length; i++) {
            console.log(Products_data[i].InputIntoMoney)
            InputIntoMoney += Products_data[i].InputIntoMoney;
            OutputIntoMoney += Products_data[i].OutputIntoMoney;
        }


        res.json({ success: true, Products: Products_data, CapitalCost: InputIntoMoney, Reneveu: OutputIntoMoney })
        //console.log(Products_data)
        //console.log(">>>>>>>tong",InputIntoMoney,"-",OutputIntoMoney);

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
//Get Products By id
//@Access Public
exports.getProducts = async (req, res) => {
    console.log("getAllProducts is called")
    try {
        const Products_data = await Products.findById(req.params.id).populate("contract", "-__v")
        res.json({ success: true, Products: Products_data })
        console.log(Products_data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
// Create Products
// @access Public
// need prepair
exports.addProducts = async (req, res) => {
    console.log("Test route ===> addProducts is called !");
    const {
        Incentive,
        ProductName,
        Quantity,
        EX_W,
        FOBCost,
        RatioUSD,
        InputPrice,
        OutputPrice,
        InputIntoMoney,
        OutputIntoMoney,
        Insurance,
        Note,
        contract,
        user
    } = req.body

    const newProducts = new Products(
        {
            Incentive,
            DetailProduct: {
                ProductName,
                Quantity,
                EX_W,
                FOBCost,
                RatioUSD,
                InputPrice,
                OutputPrice,
                InputIntoMoney,
                OutputIntoMoney,
                Insurance,
                Note
            },
            contract,
            user,
        })

    console.log("Test data recieved ====>>>", newProducts)
    console.log("ContractID ====>>>", req.body.user)
    //newProducts.contract = req.body.contract
    //console.log("newProducts.user.username ====>>>", newProducts.contract.ContractID)

    try {
        //Kiem tra hop dong co ton tai?
        Contract.find({ ContractID: req.body.contract }, (err, Contract) => { //sửa lại tìm theo idcontract
            if (Contract.length != 0) {
                //xu ly logic
                console.log("id contract ========", Contract.ContractID)
                if (newProducts.DetailProduct.EX_W === true) {
                    console.log("Nhap tu nuoc ngoai");
                    newProducts.DetailProduct.InputPrice = req.body.FOBCost * req.body.RatioUSD;
                    newProducts.DetailProduct.InputIntoMoney = newProducts.DetailProduct.InputPrice * newProducts.DetailProduct.Quantity;
                    newProducts.DetailProduct.OutputIntoMoney = req.body.OutputPrice * newProducts.DetailProduct.Quantity;
                    
                    newProducts.contract = Contract.map(contract => contract._id);
                    //load id_user
                    /* User.find({ username: req.body.user }, (err, user) => {
                        newProducts.user = user.map(user => user._id)
                    }) */
                    
                    newProducts.save((err, Products) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        
                        newProducts.save(err => {
                                    if (err) {
                                        res.status(500).send({ message: err });
                                        return;
                                    }
                                    res.json({ success: true,message:  'ProductCost was registered successfully! nhp tu nuoc ngoai', Products: newProducts }) 
                                });
                    });
                    console.log(">>>>>>>>>>>.trong IF",newProducts);
                    /* const addProducts = Products.insertMany( {
                        Incentive: req.body.Incentive,
                        DetailProduct: {
                            ProductName: req.body.ProductName,
                            Quantity: req.body.Quantity,
                            EX_W: req.body.EX_W,
                            FOBCost: req.body.FOBCost,
                            RatioUSD: req.body.RatioUSD,
                            InputPrice: newProducts.DetailProduct.InputPrice,
                            OutputPrice: req.body.OutputPrice,
                            InputIntoMoney: newProducts.DetailProduct.InputIntoMoney,
                            OutputIntoMoney: newProducts.DetailProduct.OutputIntoMoney,
                            Insurance: req.body.Insurance,
                            Note: req.body.Note
                        },
                        contract: req.body.contract,
                        user: req.body.user
                    }) */
                }
                else {
                    console.log("NHap trong nuoc", req.body.contract);
                    newProducts.DetailProduct.FOBCost = 0;
                    newProducts.DetailProduct.RatioUSD = 0;
                    newProducts.DetailProduct.InputPrice = req.body.InputPrice
                    newProducts.DetailProduct.InputIntoMoney = newProducts.DetailProduct.InputPrice * newProducts.DetailProduct.Quantity;
                    newProducts.DetailProduct.OutputIntoMoney = req.body.OutputPrice * newProducts.DetailProduct.Quantity;
                    console.log("Check newProducts Them ".newProducts)
                    newProducts.save((err, Products) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        newProducts.contract = Contract.map(contract => contract);
                        newProducts.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            }
                            res.json({ success: true, message: 'Products was registered successfully! Nhap trong nuoc', Products: newProducts })
                        });
                    });
                }
            }
            else
                res.json({ success: false, message: "Not found Contract test " })

        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

// Update Products
// @access Public
// need prepair
exports.updateProducts = async (req, res) => {
    console.log("Test route updateProducts !");

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

    console.log("Test data recieved ====>>>", req.params.id)

    try {
        let updateProducts = {
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
        if (req.body.EX_W == true) {
            console.log("Nhap tu nnuoc ngoai");
            updateProducts.InputPrice = req.body.FOBCost * req.body.RatioUSD;
            updateProducts.InputIntoMoney = updateProducts.InputPrice * updateProducts.Quantity;
            updateProducts.OutputIntoMoney = req.body.OutputPrice * updateProducts.Quantity;

            const UpdateCondition = { _id: req.params.id }
            updateProducts = await Products.findOneAndUpdate(
                UpdateCondition,
                updateProducts, { new: true }
            )
            // User not authorised to update Products or Products not found
            if (!updateProducts)
                return res.status(401).json({
                    success: false,
                    message: 'Products not found or user not authorised'
                })
            else
                res.json({
                    success: true,
                    message: 'Update Successfull !',
                    updateProducts: updateProducts
                })

        }
        else {
            console.log("NHap trong nuoc");
            updateProducts.FOBCost = 0;
            updateProducts.RatioUSD = 0;
            updateProducts.InputPrice = req.body.InputPrice
            updateProducts.InputIntoMoney = updateProducts.InputPrice * updateProducts.Quantity;
            updateProducts.OutputIntoMoney = req.body.OutputPrice * updateProducts.Quantity;
            const UpdateCondition = { _id: req.params.id }
            updateProducts = await Products.findOneAndUpdate(
                UpdateCondition,
                updateProducts, { new: true }
            )
            // User not authorised to update Products or Products not found
            if (!updateProducts)
                return res.status(401).json({
                    success: false,
                    message: 'Products not found or user not authorised'
                })
            else
                res.json({
                    success: true,
                    message: 'Update Products Successfull !',
                    updateProducts: updateProducts
                })

        }

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }

}

// Delete Products by id
// @access Public
// need prepair
exports.deleteProducts = async (req, res) => {
    console.log("Test route deleteProducts !");
    console.log(req.params.id);
    try {
        const ProductsDeleteCondition = { _id: req.params.id }//, user: req.userId }
        const deletedProducts = await Products.findOneAndDelete(ProductsDeleteCondition)

        // User not authorised or Products not found
        if (!deletedProducts)
            return res.status(401).json({
                success: false,
                message: 'Products not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete Products Successfull !' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

//================== cac ham chuc nang ================================//
//Get all Products by Contract
//@Access Public
// need prepair
exports.getProducts_ContractID = async (req, res) => {
    //console.log("getProducts_Contract is called >>>>", req.params.contractName)
    try {
        const Products_data = await Products.find({ contract: req.params.contractName },)//.populate("contract", "-__v")
        let InputIntoMoney = 0;
        let OutputIntoMoney = 0;
        for (let i = 0; i < Products_data.length; i++) {
            //console.log(Products_data[i].InputIntoMoney)
            InputIntoMoney += Products_data[i].InputIntoMoney;
            OutputIntoMoney += Products_data[i].OutputIntoMoney;
        }
        //console.log("==========",Products_data)
        //console.log(">>>>>>>tong",InputIntoMoney,"-",OutputIntoMoney);
        res.json({ success: true, Products: Products_data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}