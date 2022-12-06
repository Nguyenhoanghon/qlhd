const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/Auth')
const CTHH_Models = require('../models/ChiTietHangHoa_Model')

// @route GET api/ChiTietHangHoa
// @desc Get ChiTietHangHoa
// @access Private
router.get('/', verifyToken, async(req, res) => {
    try {
        const HH_Selected = await CTHH_Models.find({ user: req.userId, Hopdong: req.HopdongId }).populate('user', [
            'username'
        ])
        res.json({ success: true, HH_Selected })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route POST api/ChiTietHangHoa
// @desc thêm  Create ChiTietHangHoa
// @access Private
router.post('/insert', verifyToken, async(req, res) => {

    const {
        tenhang,
        soluong,
        dongiaFOB,
        tygiaUSD,
        //dongiakho,//nhap hoac tinh
        //thanhtiengiakho, cần tính
        dongiaban,
        //thanhtiengiaban, cần tính
        baohanh,
        ghichu  
    } = req.body
    if(req.body.tygiaUSD != 0)
        dongiakho = req.body.dongiaFOB*req.body.tygiaUSD
    else
        dongiakho = req.body.dongiakho
    let thanhtiengiakho = req.body.soluong * dongiakho
    let thanhtiengiaban = req.body.soluong * req.body.dongiaban
        // Simple validation
    if (!tenhang || !soluong)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập tên hàng hoặc số lượng đang bỏ trống ' })

    try {
        const newChiTietHangHoa = new CTHH_Models({
            tenhang,
            soluong,
            dongiaFOB,
            tygiaUSD,
            dongiakho,
            thanhtiengiakho, //cần tính
            dongiaban,
            thanhtiengiaban,
            baohanh, //cần tính
            ghichu,
            user: req.userId,
            hopdong:req.hopdongId
        })

        await newChiTietHangHoa.save()

        res.json({ success: true, message: 'Thêm thành công!', ChiTietHangHoa: newChiTietHangHoa })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Lỗi kết nối đến server' })
    }
})

// @route PUT api/ChiTietHangHoa
// @desc Update ChiTietHangHoa
// @access Private
router.put('/:id', verifyToken, async(req, res) => {
    const {
        tenhang,
        soluong,
        dongiaFOB,
        dongiakho,
        //thanhtiengiakho, cần tính
        dongiaban,
        //thanhtiengiaban, cần tính
        ghichu
    } = req.body
    let thanhtiengiakho = req.body.soluong * req.body.dongiakho
    let thanhtiengiaban = req.body.soluong * req.body.dongiaban
        // Simple validation
    if (!tenhang)
        return res
            .status(400)
            .json({ success: false, message: 'Cần nhập tên hàng' })

    try {
        let updatedChiTietHangHoa = {
            tenhang,
            soluong,
            dongiaFOB,
            dongiakho,
            thanhtiengiakho, //cần tính
            dongiaban,
            thanhtiengiaban, //cần tính
            ghichu
        }

        const ChiTietHangHoa_UpdateCondition = { _id: req.params.id, user: req.userId }

        updatedChiTietHangHoa = await ChiTietHangHoa.findOneAndUpdate(
            ChiTietHangHoa_UpdateCondition,
            updatedChiTietHangHoa, { new: true }
        )

        // User not authorised to update post or post not found
        if (!updatedChiTietHangHoa)
            return res.status(401).json({
                success: false,
                message: 'ChiTietHangHoa not found or user not authorised'
            })

        res.json({
            success: true,
            message: 'Excellent progress!',
            ChiTietHangHoa: updatedChiTietHangHoa
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

// @route DELETE api/ChiTietHangHoa
// @desc Delete ChiTietHangHoa
// @access Private
router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const ChiTietHangHoa_DeleteCondition = { _id: req.params.id, user: req.userId }
        const deletedChiTietHangHoa = await ChiTietHangHoa.findOneAndDelete(ChiTietHangHoa_DeleteCondition)

        // User not authorised or post not found
        if (!deletedChiTietHangHoa)
            return res.status(401).json({
                success: false,
                message: 'ChiTietHangHoa  not found or user not authorised'
            })

        res.json({ success: true, Delete_ChiTietHangHoa: deletedChiTietHangHoa })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router