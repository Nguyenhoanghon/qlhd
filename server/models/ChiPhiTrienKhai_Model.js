const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChiPhi = new Schema({
  noidung: {
    type: String,
    required: true,
  },
  donvi: {
    type: String,
    required: true,
  },
  dongia: {
    type: Number,
    required: true,
  },
  soluong_ngay: {
    type: Number,
    required: true,
  },
  soluong_luot: {
    type: Number,
    required: true,
  },
  thanhtien: {
    type: Number,
    required: true,
  },
  ghichu: {
    type: String,
    required: true,
  },
  dutru: {
    type: String,
    required: true,
  },
});

const Noidung = new Schema({
  noidung: {
    type: String,
    required: true,
  },
  chiphi: [ChiPhi],
});

const ChiPhiTrienKhai = new Schema({
  chiphichung: [Noidung],
  chiphitrienkhai: [Noidung],

  hopdong: {
    type: Schema.Types.ObjectId,
    ref: "hopdong",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("chiphitrienkhai", ChiPhiTrienKhai);
