const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CTHH_Model = new Schema({
    tenhang: {
        type: String,
        required: true
    },
    soluong: {
        type: Number,
        required: true
    },
    dongiaFOB: {
        type: Number
    },
    tygiaUSD:{
        type:Number
    },
    dongiakho: {
        type: Number
    },
    thanhtiengiakho: { //cần tính
        type: Number
    },
    dongiaban: {
        type: Number
    },
    thanhtiengiaban: { //cần tính
        type: Number
    },
    baohanh:{
        type: Boolean
    },
    ghichu: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    hopdong: {
        type: Schema.Types.ObjectId,
        ref: 'hopdongs'
    }
})

module.exports = mongoose.model('CTHH_Models', CTHH_Model)