const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const {authJwt} = require("../middleware/authJwt");
const db = require("../models");
const Users = db.user;
const Role = db.role;
const Contract = db.Contract;


//============== Controllers Public Access ==============//


//Get all Contract
//@Access Public
exports.getAllContract = async (req,res) => {
    console.log("getAllContract is called")
    try {
      const Contract_data = await Contract.find().populate("user", "-__v")
      res.json({ success: true, Contracts: Contract_data }) 
      //console.log(Contract_data)
      console.log(req.userId)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }


//Get Contract by id
//@Access Public
exports.getContract = async (req,res) => {
    console.log("getContract is called")
    try {
      const Contract_data = await Contract.find({_id: req.params.id}).populate("user", "-__v")
      if(Contract_data==null)
            res.json({ success: true, message: "Contract not found !" }) 
      else
            res.json({ success: true, Contracts: Contract_data })
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

// @route GET localhost:5000/api/contract/getContracts
//Get all Contract
//@Access private
exports.getContracts = async (req,res) => {
    console.log("getContracts is called")
    try {
      const Contract_data = await Contract.find({user: req.userId}).populate("user", "-__v")
      res.json({ success: true, Contract: Contract_data }) 
      //console.log(Contract_data)
      console.log(req.userId)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  } 


// Create Contract
// @access Public
exports.insertContract = async (req, res) => {
    //console.log("Test route ===> addContract is called !");
    const { 
        Center,
        Deparment,
        CustomerID,
        ContractID,
        Date
    } = req.body

    const newContract = new Contract({
        Center,
        Deparment,
        CustomerID,
        ContractID,
        Date
    })
    console.log("test data ====>>>",req.body.User)
    try {
        newContract.save((err, newContract) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (req.body.User) {// Thêm thông tin User liên kết giữa Model User <---> Model Contract
                Users.find(
                {
                    username: req.body.User //thêm người dùng chọn từ client
                },
                (err, user) => {//???(err, user)
                    if (err) {
                    res.status(500).send({ message: err });
                    return;
                    }
        
                    newContract.user = user.map(user => user._id);
                    console.log("test gia trị ====> user", newContract.user)
                    newContract.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    res.json({success: true, message: 'Thêm Hợp đồng thành công!', Contract: newContract})
                    //res.send({ message: "Contract was registered successfully!" });
                    });
                }
                );
            } else {
                try {
                    Users.findOne({ username: req.body.User }, (err, users) => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                
                        newContract.user = req.userId//Thêm Id người dùng có trong  users
                        console.log(req.userId);
                        newContract.save(err => {//
                            if (err) {
                            res.status(500).send({ message: err });
                            return;
                            }

                            //res.send({ message: "Contract was registered successfully!" });
                            res.json({success: true, message: 'Thêm Hợp đồng thành công!', Contract: newContract})
                        });
                        });
                    } 
                catch (error) {
                    console.log(error)
                    res.status(500).json({ success: false, message: 'Internal server error' })
                }
            }
        });
    
    }catch (error) {
          console.log(error)
          res.status(500).json({ success: false, message: 'Internal server error' })
    }
};

// @route PUT url  localhost:5000/api/Contract/Update/Id_Contract
// @desc Update Contract
// @access Public
exports.updateContract = async (req,res) => { 
    //test route Update
    //res.status(200).send(" Test Routes Update Contract");
    const { 
        Center,
        Deparment,
        CustomerID,
        ContractID,
        Date 
    } = req.body
    // Simple validation
    if (!ContractID)
        return res
            .status(400)
            .json({ success: false, message: 'Require Enter ContractID!!!' })


    try {
        let updatedContract = {
            Center: req.body.Center,
            Deparment: req.body.Deparment,
            CustomerID: req.body.CustomerID,
            ContractID: req.body.ContractID,
            Date: req.body.Date,
        }

        const UpdateCondition = { _id: req.params.id}//, user: req.userId }
        updatedContract = await Contract.findOneAndUpdate(
            UpdateCondition,
            updatedContract, { new: true }
        )

        // User not authorised to update Contract or Contract not found
        if (!updatedContract)
            return res.status(401).json({
                success: false,
                message: 'Contract not found or User not authorised'
            })
        else
            res.json({
                success: true,
                message: 'Update Contract Successfull !',
                updatedContract: updatedContract
            })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: 'Internal server error' })
    }
}

// @route DELETE api/posts
// @desc Delete post
// @access Private
//router.delete('/:id', verifyToken, async(req, res) => {
exports.deleteContract = async (req,res) => { 
    //test route Delete
    //res.status(200).send(" Test Routes delete");
    console.log(req.params.id);

    try {
        const ContractDeleteCondition = { _id: req.params.id}//, user: req.userId }
        const deletedContract= await Contract.findOneAndDelete(ContractDeleteCondition)

        // User not authorised or post not found
        if (!deletedContract)
            return res.status(401).json({
                success: false,
                message: 'Contract not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete deletedContract Successfull !', deletedContract: deletedContract })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

// @route GET localhost:5000/api/Contract/find/:id
//Get all Contract
//@Access Public
// Chức năng tìm hợp đồng theo ID
exports.findContract = async (req,res) => { //[authJwt.verifyToken],
    console.log("===>>>> test route Find Contract");
    try {
      console.log("Find is called")
      const Contract_data = await Contract.find({ _id: req.params.id }).populate("user", "-__v")
      res.json({ success: true, Contract: Contract_data }) 
      console.log(Contract_data)
  
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
  }

//them contract có găns thông tin user tao nó đưọc request từ client
// @route POST localhost:5000/api/Contract/registerContract
// @access Private

exports.registerContract = async (req, res) => {
    //console.log("Test route ===> registerContract is called !");
    const { 
        Center,
        Deparment,
        CustomerID,
        ContractID,
        Date
    } = req.body

    const newContract = new Contract({
        Center,
        Deparment,
        CustomerID,
        ContractID,
        Date
    })
    console.log("test data ====>>>",req.userId)
    try {
        newContract.save((err, newContract) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (req.body.User) {// Thêm thông tin User liên kết giữa Model User <---> Model Contract
                Users.find(
                {
                    username: req.userId//req.body.User thêm người dùng chọn từ client
                },
                (err, user) => {//???(err, user)
                    if (err) {
                    res.status(500).send({ message: err });
                    return;
                    }
        
                    newContract.user = user.map(user => user._id);
                    console.log("test gia trị ====> user", newContract.user)
                    newContract.save(err => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
        
                    res.send({ message: "Contract was registered successfully!" });
                    });
                }
                );
            } else {
                try {
                    Users.findOne({ username: req.body.User }, (err, users) => {//??? (err, users) 
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                
                        newContract.user = req.userId//Thêm Id người dùng đăng nhập
                        console.log(req.userId);
                        newContract.save(err => {//
                            if (err) {
                            res.status(500).send({ message: err });
                            return;
                            }

                            res.send({ message: "Contract was registered successfully!" });
                        });
                        });
                    } 
                catch (error) {
                    console.log(error)
                    res.status(500).json({ success: false, message: 'Internal server error' })
                }
            }
        });
    
    }catch (error) {
          console.log(error)
          res.status(500).json({ success: false, message: 'Internal server error' })
    }
};