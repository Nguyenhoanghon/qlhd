const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const { update } = require('../models/User_Model');
const { response } = require('express');
const Contract = db.Contract;
const AuxiliaryCost = db.AuxiliaryCost;
const ProductCost = db.ProductCost;

//============== Controllers Public Access ==============//


// @route GET localhost:5000/api/AuxiliaryCost/getAllAuxiliaryCost
//Get AuxiliaryCost by Id
//@RepairNew: Not
exports.getAuxiliaryCost_byid = async (req, res) => {
    console.log("getAllAuxiliaryCost is called")
    try {
        const AuxiliaryCost_data = await AuxiliaryCost.findById({ _id: req.params.id })//.populate("contract", "-__v")
        if (AuxiliaryCost_data == null)
            res.json({ success: true, message: "AuxiliaryCost not found !" })
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
//@RepairNew: Not
exports.getAuxiliaryCost_byidContract = async (req, res) => {
    console.log("getAllAuxiliaryCost is called")
    try {
        const AuxiliaryCost_data = await AuxiliaryCost.find({ contract: req.params.id })
        if (AuxiliaryCost_data == null)
            res.json({ success: true, message: "AuxiliaryCost not found !" })
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
//@RepairNew: Not use
exports.getAuxiliaryCost_byidContract_plan = async (req, res) => {
    console.log("getAllAuxiliaryCost is called", "idContract", req.params.id, "Plan", req.params.plan)

    try {
        const AuxiliaryCost_data = await AuxiliaryCost.find({ contract: req.params.id, Plan: req.params.plan })
        if (AuxiliaryCost_data == null)
            res.json({ success: true, message: "AuxiliaryCost not found !" })
        else
            res.json({ success: true, AuxiliaryCost_data: AuxiliaryCost_data })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}



//KHoi tao AuxiliaryCost:  Renevue va Plan voi idcontract
//Test: ok
exports.create_AuxiliaryCost = async (req, res) => {
    //test
    console.log("Test route ===> Khoi tao AuxiliaryCost !");
    const { Renevue, Plan, ListCosts, idcontract, user } = req.body;
    //test
    //console.log("Renevue==", req.body.Renevue)
    console.log("Plan===", req.body.Plan)

    const newAuxiliaryCost = new AuxiliaryCost({ Renevue, Plan, ListCosts, idcontract, user })

    try {
        //Kiem tra hop dong co ton tai?
        Contract.find({ _id: req.params.idcontract }, (err, Contract) => {
            if (Contract.length != 0)
                console.log(">>>>>>>>>>> Find Cotract");
            else
                res.json({ success: true, message: "Not found Contract" })
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    //load Renevue
    newAuxiliaryCost.Renevue = 0;
    try {
        const ProductCost_data = await ProductCost.find({ contract: req.params.idcontract })
        for (let i = 0; i < ProductCost_data.length; i++) {
            newAuxiliaryCost.Renevue += ProductCost_data[i].OutputIntoMoney;
        }
        console.log("Load Renevue===:", newAuxiliaryCost.Renevue)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    //test
    console.log("Data newAuxiliaryCost.Renevue===:", newAuxiliaryCost)

    if (!req.body.Plan)
        return res.status(400).json({ success: false, message: "Missing Renevue Or Plan" });
    try {
        const response = await AuxiliaryCost.findOneAndUpdate(
            {
                contract: req.params.idcontract,
            },
            {
                $push: {
                    ListCosts: []
                },
                Renevue: newAuxiliaryCost.Renevue,
                Plan: req.body.Plan,
                contract: req.params.idcontract,
                user: req.userId, //note
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.json({
            success: true,
            message: "Khởi tạo AuxiliaryCost",
            newAuxiliaryCost: response,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: " Internal server error" });
    }
}
//End Khoi tao Renevue va Plan voi idcontract


// Insert Cost in Listcosts by idcontract
// @access Public
//Test: ok

exports.add_AuxiliaryCost_Cost = async (req, res) => {
    console.log("Test route ===> THEM CHI PHI VAO LIST COST !");

    const {
        Content,
        Cost,
        Note } = req.body;
    console.log("idcontract==========", req.params.idcontract)
    console.log("Content", req.body.Content)
    console.log("Cost", req.body.Cost)
    console.log("Note", req.body.Note)

    const newAuxiliaryCost = new AuxiliaryCost({
        Content,
        Cost,
        Note
    })

    try {
        //Kiem tra hop dong co ton tai?
        Contract.find({ _id: req.params.idcontract }, (err, Contract) => {
            if (Contract.length != 0)
                console.log(">>>>>>>>>>> Find Cotract");
            else
                res.json({ success: true, message: "Not found Contract" })
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

    if (!req.body.Content || !req.body.Cost)
        return res.status(400).json({ success: false, message: "Missing Content  dsdsd  or Cost" });
    try {
        const reponse = await AuxiliaryCost.findOneAndUpdate(
            {
                contract: req.params.idcontract,
            },
            {
                $push: {
                    ListCosts: {
                        Content,
                        Cost,
                        Note
                    },
                },
                contract: req.params.idcontract,
                user: req.userId,
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.json({
            success: true,
            message: "Thêm thành công !!!",
            AuxiliaryCost: reponse,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}


// Update Revenue in AuxiliaryCost by idcontract
exports.update_AuxiliaryCost_Revenue = async (req, res) => {
    //test
    console.log("Test route ===> Khoi tao AuxiliaryCost !");
    const { Renevue, Plan, ListCosts, idcontract, user } = req.body;

    const newAuxiliaryCost = new AuxiliaryCost({ Renevue, Plan, ListCosts, idcontract, user })

    try {
        //Kiem tra hop dong co ton tai?
        Contract.find({ _id: req.params.idcontract }, (err, Contract) => {
            if (Contract.length != 0)
                console.log(">>>>>>>>>>> Find Cotract");
            else
                res.json({ success: true, message: "Not found Contract" })
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    //load Renevue
    newAuxiliaryCost.Renevue = 0;
    try {
        const ProductCost_data = await ProductCost.find({ contract: req.params.idcontract })
        for (let i = 0; i < ProductCost_data.length; i++) {
            newAuxiliaryCost.Renevue += ProductCost_data[i].OutputIntoMoney;
        }
        console.log("Load Renevue===:", newAuxiliaryCost.Renevue)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    //test
    console.log("Data newAuxiliaryCost.Renevue===:", newAuxiliaryCost)

    try {
        const response = await AuxiliaryCost.findOneAndUpdate(
            {
                contract: req.params.idcontract,
            },
            {
                $push: {

                },
                Renevue: newAuxiliaryCost.Renevue,

                contract: req.params.idcontract,
                user: req.userId, //note
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.json({
            success: true,
            message: "Cập nhật AuxiliaryCost",
            newAuxiliaryCost: response,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: " Internal server error" });
    }
}

// Update Plan in AuxiliaryCost by idcontract
exports.update_AuxiliaryCost_Plan = async (req, res) => {
    //test
    console.log("Test route ===> Khoi tao AuxiliaryCost !");
    const { Renevue, Plan, ListCosts, idcontract, user } = req.body;
    //test
    //console.log("Renevue==", req.body.Renevue)
    console.log("Plan===", req.body.Plan)

    const newAuxiliaryCost = new AuxiliaryCost({ Renevue, Plan, ListCosts, idcontract, user })

    try {
        //Kiem tra hop dong co ton tai?
        Contract.find({ _id: req.params.idcontract }, (err, Contract) => {
            if (Contract.length != 0)
                console.log(">>>>>>>>>>> Find Cotract");
            else
                res.json({ success: true, message: "Not found Contract" })
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    //load Renevue
    newAuxiliaryCost.Renevue = 0;
    try {
        const ProductCost_data = await ProductCost.find({ contract: req.params.idcontract })
        for (let i = 0; i < ProductCost_data.length; i++) {
            newAuxiliaryCost.Renevue += ProductCost_data[i].OutputIntoMoney;
        }
        console.log("Load Renevue===:", newAuxiliaryCost.Renevue)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
    //test
    console.log("Data newAuxiliaryCost.Renevue===:", newAuxiliaryCost)

    if (!req.body.Plan)
        return res.status(400).json({ success: false, message: "Missing Renevue Or Plan" });
    try {
        const response = await AuxiliaryCost.findOneAndUpdate(
            {
                contract: req.params.idcontract,
            },
            {
                $push: {
                    ListCosts: []
                },
                Renevue: newAuxiliaryCost.Renevue,
                Plan: req.body.Plan,
                contract: req.params.idcontract,
                user: req.userId, //note
            },
            {
                new: true,
                upsert: true,
            }
        );

        res.json({
            success: true,
            message: "Cập nhật AuxiliaryCost",
            newAuxiliaryCost: response,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: " Internal server error" });
    }
}

// Update Cost in ListCost by idcontract/idcost
// @access Public
// Test: ok
exports.update_AuxiliaryCost_Cost = async (req, res) => {
    console.log("===> updateAuxiliaryCost is called !");
    //Load Tong gia von va tong doanh thu tu Form1
    const {
        Renevue, // Load từ form 1
        Plan, // Lua chon gia tri, M 
        Content,
        Cost, // = if(Cost<1; Cost*CapitalCost ; Cost)
        Note,
        idcontract,
        idCost
    } = req.body

    let updatedAuxiliaryCost = {
        Renevue, // Load từ form 1
        Content,
        Cost, // = if(Cost<1; Cost*CapitalCost ; Cost)
        Note
    }
    console.log("Test route ===> CAP NHAT CHI  AUXILIARY !");
    console.log("idcontract==========", req.params.idcontract)
    console.log("idContentCost==========", req.params.idCost)

    console.log("Test data recieved ====>>>", updatedAuxiliaryCost)
    console.log(req.body.idcontract);

    try {
        // Load data tu Form 1: Lay tong gia von va Doanh thu
        //load Renevue
        updatedAuxiliaryCost.Renevue = 0;
        try {
            const ProductCost_data = await ProductCost.find({ contract: req.params.idcontract })
            for (let i = 0; i < ProductCost_data.length; i++) {
                updatedAuxiliaryCost.Renevue += ProductCost_data[i].OutputIntoMoney;
            }
            console.log("Load Renevue===:", updatedAuxiliaryCost.Renevue)

        }
        catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: 'Internal server error' })
        }

        console.log("Test data UPDATE ====>>>", updatedAuxiliaryCost)

        const response = await AuxiliaryCost.updateOne(
            {
                contract: req.params.idcontract,
                "ListCosts": { $elemMatch: { _id: req.params.idCost } }
            },
            {
                $set: {

                    "ListCosts.$.Content": req.body.Content,
                    "ListCosts.$.Cost": req.body.Cost,
                    "ListCosts.$.Note": req.body.Note
                },
                Renevue: updatedAuxiliaryCost.Renevue,

            }
        );

        res.json({
            success: true,
            message: "Cập nhật thành công !",
            AuxiliaryCost: response,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}


//Get all AuxiliaryCost
//@RepairNew: ok
exports.getAllAuxiliaryCost = async (req, res) => {
    console.log("getAllAuxiliaryCost is called")
    try {
        const AuxiliaryCost_data = await AuxiliaryCost.find()//.populate("contract", "-__v")    
        console.log("Test ====> chi tiet CP vat tu phu", AuxiliaryCost_data)

        res.json({ success: true, AuxiliaryCost: AuxiliaryCost_data })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

// delete AuxiliaryCost  By id_AuxiliaryCost
// @access Public
//Recheck: OK
exports.deleteAuxiliaryCost_id_Auxiliary = async (req, res) => {
    console.log("Test route deleteAuxiliaryCost !");
    console.log(req.params.id);
    try {
        const AuxiliaryCostDeleteCondition = { _id: req.params.id_Auxiliary }

        const deletedAuxiliaryCost = await AuxiliaryCost.findOneAndDelete(AuxiliaryCostDeleteCondition)
        // User not authorised or AuxiliaryCost not found
        if (!deletedAuxiliaryCost)
            return res.status(401).json({
                success: false,
                message: 'AuxiliaryCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete AuxiliaryCost Successfull !' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

// delete AuxiliaryCost  By id_Contract
// @access Public
//Recheck: OK
exports.deleteAuxiliaryCost_id_Contract = async (req, res) => {
    console.log("Test route deleteAuxiliaryCost_id_Contract !");
    console.log(req.params.id);
    try {
        const AuxiliaryCostDeleteCondition = { contract: req.params.id_Contract }//, user: req.userId }

        const deletedAuxiliaryCost = await AuxiliaryCost.findOneAndDelete(AuxiliaryCostDeleteCondition)
        // User not authorised or AuxiliaryCost not found
        if (!deletedAuxiliaryCost)
            return res.status(401).json({
                success: false,
                message: 'AuxiliaryCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete AuxiliaryCost Successfull !' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

// delete Cost in Listcosts by idcontract/idcost
// @access Public
//Recheck: OK
exports.deleteAuxiliaryCost_Cost = async (req, res) => {
    console.log("Test route deleteAuxiliaryCost_Cost !");
    console.log("req.params.id", req.params.idcontract);
    console.log("req.params.idCost", req.params.idCost)
    
    try {

        const delete_AuxiliaryCost = await AuxiliaryCost.updateOne(
            {
                contract: req.params.idcontract,

            },
            {
                $pull:
                {
                    "ListCosts": {
                        _id: req.params.idCost
                    }
                }
            }
        );
        // User not authorised or ImplementationCost not found
        if (!delete_AuxiliaryCost)
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