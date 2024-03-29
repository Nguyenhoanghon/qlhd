const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const User = require('../models/User_Model');
const Contract = db.Contract;
const Products = db.Products;

//============== Controllers Public Access ==============//
//Khoi tao Products:  Incentive voi Contract._id
//Test: ok
exports.add_Incentive = async (req, res) => {
    //test
    console.log("Test route add_Incentive ===> req.params.contract ",req.params.contract);
    const { Incentive, contract, user } = req.body; 
    const newProducts = new Products({ Incentive, contract, user })
    console.log("Data newProducts ========:", newProducts)
    try {
        //Kiem tra hop dong co ton tai?
        Contract.find({ _id: req.params.contract }, (err, Contract) => {
            if (Contract.length != 0) {
                //gan idcontract vao Product.contract
                newProducts.contract = Contract.map(contract => contract._id);

            }
            else
                res.json({ success: true, message: "Not found Contract" })
        });

        //Kiem tra nguoi dung co ton tai?
        /*
        User.find({ _id: req.params.user }, (err, User) => {
            if (User.length != 0) {
                console.log(">>>>>>>>>>> Find User");
                //gan idUser vao Product.user
                newProducts.user = User.map(user => user._id);
            }
            else
                res.json({ success: true, message: "Not found User" })
        });
        */
        try {
            
            const response = await Products.findOneAndUpdate(
                {
                    contract: req.params.contract,
                },
                {
                    $push: {
                        ListProducts: []
                    },
                    Incentive: newProducts.Incentive,
                },
                {
                    new: true,
                    upsert: true,
                }
            );

            res.json({
                success: true,
                message: "Thêm Incentive",
                newProducts: newProducts,
            });

        
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: " Internal server error" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
//End Khoi tao Products:  Incentive voi Contract._id
//Them Products
//Test ok
exports.addProducts = async (req, res) => {
    console.log("Test route ===> addProducts is called !");
    let {
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
    } = req.body
    console.log("Chi tiet hang hoa EX_W ====", req.body.EX_W);


    if (!req.body.ProductName || !req.body.Quantity)
        return res.status(400).json({ success: false, message: "Missing ProductName or Quantity" });
    try {
        //xu ly data
        if (req.body.EX_W === true) {
            console.log("Nhap tu nuoc ngoai");
            InputPrice = req.body.FOBCost * req.body.RatioUSD;
            InputIntoMoney = InputPrice * req.body.Quantity;
            OutputIntoMoney = req.body.OutputPrice * req.body.Quantity;
        }
        else {
            console.log("NHap trong nuoc", req.params.contract);
            FOBCost = 0;
            RatioUSD = 0;
            InputPrice = req.body.InputPrice
            InputIntoMoney = req.body.InputPrice * req.body.Quantity;
            OutputIntoMoney = req.body.OutputPrice * req.body.Quantity;
        }
        const response = await Products.findOneAndUpdate(
            {
                contract: req.params.contract,
            },
            {
                $push: {
                    ListProducts: {
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

                },
                contract: req.params.contract,
                //user: req.body.user
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.json({
            success: true,
            message: "Thêm thành công !!!",
            newProducts: response,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }


}

//Get all Products
//@Access Public
// test: ok
exports.getAllProducts = async (req, res) => {
    console.log("getAllProducts is called")
    try {
        const Products_data = await Products.find()//.populate("contract", "-__v")
        res.json({ success: true, Products: Products_data })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
//Get Products By idcontract
//@Access Public
// Test: ok
exports.getProducts_idcontract = async (req, res) => {
    console.log("getProducts_idcontract is called")
    try {
        const Products_data = await Products.find({contract: req.params.idcontract})//.populate("contract", "-__v")
        res.json({ success: true, Products: Products_data })
        console.log(Products_data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

// Update Product by idcontract/idProduct
// @access Public
// Test: ok
exports.updateProduct_idcontract = async (req, res) => {
    console.log("Test route updateProducts !");
    let {
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
        contract
    } = req.body
    console.log("Chi tiet hang hoa ====", req.body.ProductName);


    if (!req.body.ProductName || !req.body.Quantity)
        return res.status(400).json({ success: false, message: "Missing ProductName or Quantity" });
    try {
        //xu ly data

        if (req.body.EX_W === true) {
            console.log("Nhap tu nuoc ngoai");
            InputPrice = req.body.FOBCost * req.body.RatioUSD;
            InputIntoMoney = InputPrice * req.body.Quantity;
            OutputIntoMoney = req.body.OutputPrice * req.body.Quantity;
        }
        else {
            console.log("NHap trong nuoc", req.body.contract);
            FOBCost = 0;
            RatioUSD = 0;
            InputPrice = req.body.InputPrice
            InputIntoMoney = req.body.InputPrice * req.body.Quantity;
            OutputIntoMoney = req.body.OutputPrice * req.body.Quantity;
        }
        const response = await Products.updateOne(
            {
                contract: req.body.contract,
                "ListProducts": { $elemMatch: { _id: req.body.idProduct } }
            },
            {
                $set: {
                    "ListProducts.$": {
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

                },
                contract: req.body.contract
            }/* ,
            {
                new: true,
                upsert: true,
            } */
        );

        res.json({
            success: true,
            message: "Cập nhật thành công !!!",
            updateProduct: response,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }

}

// Delete Products by id hang hoa
// @access Public
// Test: ok
exports.deleteProduct_idProduct = async (req, res) => {
    console.log("Test route deleteProduct_idcontract !");
    console.log("ID idProduct", req.params.idProduct);
    try {
  
      const response = await Products.updateOne(
        {
            //contract: req.body.idcontract,
            "ListProducts": { $elemMatch: { _id: req.params.idProduct } }
        },
        {
          $pull:
          {
            "ListProducts": {
              _id: req.params.idProduct
            }
          }
        }
      );
  
      // User not authorised or Products not found
      if (!response)
        return res.status(401).json({
          success: false,
          message: 'Not found or user not authorised'
        })
  
      res.json({ success: true, message: 'Delete Successfull !', deletedProducts: response })
    } catch (error) {
      console.log(error)
      res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

// Delete all Products by idcontract
// @access Public
// Test: ok
exports.deleteProduct = async (req, res) => {
    console.log("Test route deleteProduct !");
    console.log("ID idcontract", req.body.idcontract);
    try {
  
      const deletedProducts = await Products.deleteOne(
        {
            _id: req.params.idProducts
        }
      );
  
      // User not authorised or Products not found
      if (!deletedProducts)
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


//================== cac ham chuc nang ================================//
