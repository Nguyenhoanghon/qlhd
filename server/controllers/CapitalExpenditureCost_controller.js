const express = require('express')
const jwt = require('jsonwebtoken')
var bcrypt = require("bcryptjs");
const db = require("../models");
const Contract = db.Contract;
const CapitalExpenditureCost = db.CapitalExpenditureCost;
const Products = db.Products;

//============== Controllers Public Access ==============//

// @route GET localhost:5000/api/CapitalExpenditureCost/getAllCapitalExpenditureCost
//Get all CapitalExpenditureCost
//@Access Public
exports.getAllCapitalExpenditureCost = async (req, res) => {
    console.log("getAllCapitalExpenditureCost is called")
    try {
        const CapitalExpenditureCost_data = await CapitalExpenditureCost.find()//.populate("contract", "-__v")
        res.json({ success: true, CapitalExpenditureCost: CapitalExpenditureCost_data })
        //console.log(CapitalExpenditureCost_data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

//Get CapitalExpenditureCost by _id CapitalExpenditureCost
//@Access Public
// test ok
exports.getCapitalExpenditureCost_byid = async (req, res) => {
    console.log("getAllCapitalExpenditureCost is called")
    try {

        const CapitalExpenditureCost_data = await CapitalExpenditureCost.findById({ _id: req.params.id }).populate("contract", "-__v")
        if (CapitalExpenditureCost_data == null)
            res.json({ success: true, message: "CapitalExpenditureCost not found !" })
        else
            res.json({ success: true, CapitalExpenditureCost: CapitalExpenditureCost_data })
        //console.log(CapitalExpenditureCost_data)

    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}
//Get CapitalExpenditureCost by idcontract
//@Access Public
// test ok
exports.getCapitalExpenditureCost_byidContract = async (req, res) => {
    console.log("getAllCapitalExpenditureCost is called")

    try {
        let CapitalExpenditureCost_data = await CapitalExpenditureCost.find({ contract: req.params.idcontract })//.populate("contract", "-__v")
        if (CapitalExpenditureCost_data == null)
            res.json({ success: true, message: "idcontract not found !" })
        else {

            //=== Update gia von, doanh thu (CapitalCost, Revenue )
            const Products_data = await Products.find({ contract: req.params.idcontract })
            console.log("ProductCost_data,", req.params.idcontract, Products_data)
            CapitalExpenditureCost_data[0].CapitalCost = 0;
            CapitalExpenditureCost_data[0].Revenue = 0;
            //doanh thu
            Products_data.map(Products =>
                Products.ListProducts.map(ListProduct => (
                    CapitalExpenditureCost_data[0].Revenue += ListProduct.OutputIntoMoney
                )))
            //gia von
            Products_data.map(Products =>
                Products.ListProducts.map(ListProduct => (
                    CapitalExpenditureCost_data[0].CapitalCost += ListProduct.InputIntoMoney
                )))
            //Update Dat coc cua khach hang (Deposits)
            CapitalExpenditureCost_data[0].Deposits = CapitalExpenditureCost_data[0].Revenue * 0.2
            //Update Dat coc NTP (DepositsNTP)
            CapitalExpenditureCost_data[0].DepositsNTP = CapitalExpenditureCost_data[0].CapitalCost * 0.3
            //Update Chi phi von (CapitalExpense)
            CapitalExpenditureCost_data[0].CapitalExpense = ((CapitalExpenditureCost_data[0].InventoryDays + CapitalExpenditureCost_data[0].ImplementationDays - CapitalExpenditureCost_data[0].BedtDays) * CapitalExpenditureCost_data[0].CapitalCost + CapitalExpenditureCost_data[0].DebtCollectionDays * (CapitalExpenditureCost_data[0].Revenue - CapitalExpenditureCost_data[0].Deposits + CapitalExpenditureCost_data[0].DepositsNTP)) * 0.1 / 365;
            //Thuc hien update data
            CapitalExpenditureCost.findOneAndUpdate({ contract: req.params.idcontract }, CapitalExpenditureCost_data[0], { new: true })
            //=== End Update gia von, doanh thu (CapitalCost, Revenue )
            //Response Client

            res.json({ success: true, CapitalExpenditureCost: CapitalExpenditureCost_data })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

// Insert CapitalExpenditureCost
// @access Public
// Note: Load Form 1 co loc theo Hop Dong Khong???
//    - Code hien tai Lay het Du lieu Chi tiet hang hoa
//    - De loc theo hop dong thi code them tra ve _id cua req.body.ContractID

exports.addCapitalExpenditureCost = async (req, res) => {
    console.log("Test route ===> addCapitalExpenditureCost is called !",req.params.idcontract);

    //Load Tong gia von va tong doanh thu tu Form1  

    const {
        CapitalCost,
        Revenue,
        CapitalExpense,
        InventoryDays,
        ImplementationDays,
        BedtDays,
        DebtCollectionDays,
        Deposits,
        DepositsNTP,
        Note,
        ContractID
    } = req.body

    const newCapitalExpenditureCost = new CapitalExpenditureCost({
        CapitalCost,
        Revenue,
        CapitalExpense,
        InventoryDays,
        ImplementationDays,
        BedtDays,
        DebtCollectionDays,
        Deposits,
        DepositsNTP,
        Note
    })
    //console.log("Test data recieved ====>>>",newCapitalExpenditureCost)
    //console.log("ContractID ",req.body.ContractID);

    try {
        // Load data tu Form 1: Lay tong gia von va Doanh thu
        newCapitalExpenditureCost.CapitalCost = 0;
        newCapitalExpenditureCost.Revenue = 0;
        
        const Products_data = await Products.find({ contract: req.body.ContractID })
        //doanh thu
        Products_data.map(Products =>
            Products.ListProducts.map(ListProduct => (
                newCapitalExpenditureCost.Revenue += ListProduct.OutputIntoMoney
            )))
        //gia von
        Products_data.map(Products =>
            Products.ListProducts.map(ListProduct => (
                newCapitalExpenditureCost.CapitalCost += ListProduct.InputIntoMoney
            )))

        console.log("Sau khi load tu Form 1>>>>>>>CapitalCost: ", newCapitalExpenditureCost.CapitalCost, "- Revenue: ", newCapitalExpenditureCost.Revenue);
        //Tinh Dat coc cua khach hang
        newCapitalExpenditureCost.Deposits = newCapitalExpenditureCost.Revenue * 0.2
        //Tinh Dat coc NTP
        newCapitalExpenditureCost.DepositsNTP = newCapitalExpenditureCost.CapitalCost * 0.3
        console.log("Sau khi load tu Form 1>>>>>>>Deposits: ", newCapitalExpenditureCost.Deposits, "- DepositsNTP: ", newCapitalExpenditureCost.DepositsNTP);
        //Tinh chi phi von
        newCapitalExpenditureCost.CapitalExpense = ((newCapitalExpenditureCost.InventoryDays + newCapitalExpenditureCost.ImplementationDays - newCapitalExpenditureCost.BedtDays) * newCapitalExpenditureCost.CapitalCost + newCapitalExpenditureCost.DebtCollectionDays * (newCapitalExpenditureCost.Revenue - newCapitalExpenditureCost.Deposits + newCapitalExpenditureCost.DepositsNTP)) * 0.1 / 365;

        //Thuc hien luu vao DB voi dieu kien theo tung Hop dong
        Contract.find({ _id: req.body.ContractID }, (err, Contract) => {
            if (Contract.length != 0) {
                newCapitalExpenditureCost.save((err, CapitalExpenditureCost) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    }
                    newCapitalExpenditureCost.contract = Contract.map(contract => contract._id);
                    newCapitalExpenditureCost.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.json({ success: true, message: 'CapitalExpenditureCost was registered successfully!', CapitalExpenditureCost: newCapitalExpenditureCost })
                    });
                    console.log("Sau khi them >>>>>", newCapitalExpenditureCost)
                });
            }
            else
                res.json({ success: false, message: `Hợp đồng ${req.body.ContractID} không tồn tại !!!`, CapitalExpenditureCost: newCapitalExpenditureCost })
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}


// update CapitalExpenditureCost By id
// @access Public
exports.updateCapitalExpenditureCost = async (req, res) => {
    console.log("Test route ===> updateCapitalExpenditureCost is called !");
    //Load Tong gia von va tong doanh thu tu Form1
    const {
        CapitalCost,
        Revenue,
        CapitalExpense,
        InventoryDays,
        ImplementationDays,
        BedtDays,
        DebtCollectionDays,
        Deposits,
        DepositsNTP,
        Note,
        ContractID
    } = req.body

    let updatedCapitalExpenditureCost = {
        CapitalCost,
        Revenue,
        CapitalExpense,
        InventoryDays,
        ImplementationDays,
        BedtDays,
        DebtCollectionDays,
        Deposits,
        DepositsNTP,
        Note,
        ContractID
    }
    console.log("Test data recieved ====>>>", updatedCapitalExpenditureCost)
    console.log(req.body.ContractID);

    try {

        // Load data tu Form 1: Lay tong gia von va Doanh thu
        
        updatedCapitalExpenditureCost.CapitalCost = 0;
        updatedCapitalExpenditureCost.Revenue = 0;

        //=== Update gia von, doanh thu (CapitalCost, Revenue )
        const Products_data = await Products.find({ contract: req.body.ContractID })
        console.log("Products_data======updateCapitalExpenditureCost", Products_data)
        //doanh thu
        Products_data.map(Products =>
            Products.ListProducts.map(ListProduct => (
                updatedCapitalExpenditureCost.Revenue += ListProduct.OutputIntoMoney
            )))
        //gia von
        Products_data.map(Products =>
            Products.ListProducts.map(ListProduct => (
                updatedCapitalExpenditureCost.CapitalCost += ListProduct.InputIntoMoney
            )))
        
        console.log("Sau khi load tu Form 1>>>>>>>CapitalCost: ", updatedCapitalExpenditureCost.CapitalCost, "- Revenue: ", updatedCapitalExpenditureCost.Revenue);
        //Dat coc cua khach hang
        updatedCapitalExpenditureCost.Deposits = updatedCapitalExpenditureCost.Revenue * 0.2
        //Dat coc NTP
        updatedCapitalExpenditureCost.DepositsNTP = updatedCapitalExpenditureCost.CapitalCost * 0.3
        console.log("Sau khi load tu Form 1>>>>>>>Deposits: ", updatedCapitalExpenditureCost.Deposits, "- DepositsNTP: ", updatedCapitalExpenditureCost.DepositsNTP);
        //Tinh chi phi von
        updatedCapitalExpenditureCost.CapitalExpense = ((updatedCapitalExpenditureCost.InventoryDays + updatedCapitalExpenditureCost.ImplementationDays - updatedCapitalExpenditureCost.BedtDays) * updatedCapitalExpenditureCost.CapitalCost + updatedCapitalExpenditureCost.DebtCollectionDays * (updatedCapitalExpenditureCost.Revenue - updatedCapitalExpenditureCost.Deposits + updatedCapitalExpenditureCost.DepositsNTP)) * 0.1 / 365;

        //Thuc hien luu vao DB voi dieu kien theo tung Hop dong
        const UpdateCondition = { _id: req.params.id }
        updatedCapitalExpenditureCost = await CapitalExpenditureCost.findOneAndUpdate(
            UpdateCondition,
            updatedCapitalExpenditureCost, { new: true }
        )
        // User not authorised to update ProductCost or ProductCost not found
        if (!updatedCapitalExpenditureCost)
            return res.status(401).json({
                success: false,
                message: 'CapitalExpenditureCost not found or user not authorised'
            })
        else
            res.json({
                success: true,
                message: 'updated CapitalExpenditureCost Successfull !',
                updatedCapitalExpenditureCost: updatedCapitalExpenditureCost
            })


    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

// delete CapitalExpenditureCost  By id
// @access Public
exports.deleteCapitalExpenditureCost = async (req, res) => {
    console.log("Test route deleteCapitalExpenditureCost !");
    console.log(req.params.id);
    try {
        const CapitalExpenditureCostDeleteCondition = { _id: req.params.id }//, user: req.userId }
        const deletedCapitalExpenditureCost = await CapitalExpenditureCost.findOneAndDelete(CapitalExpenditureCostDeleteCondition)

        // User not authorised or CapitalExpenditureCost not found
        if (!deletedCapitalExpenditureCost)
            return res.status(401).json({
                success: false,
                message: 'CapitalExpenditureCost not found or user not authorised'
            })

        res.json({ success: true, message: 'Delete CapitalExpenditureCost Successfull !' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }

}

