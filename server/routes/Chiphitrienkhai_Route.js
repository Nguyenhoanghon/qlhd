const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/Auth");
const ChiphiTrienKhai = require("../models/ChiphiTrienKhai_Model");

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const DataChiphiTrienKhai = await ChiphiTrienKhai.find({
      hopdong: req.params.id,
    }).populate("user", ["username"]);

    res.json({ success: true, DataChiphiTrienKhai });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/chiphichung", verifyToken, async (req, res) => {
  const { noidung, hopdongId } = req.body;
  if (!noidung)
    return res.status(400).json({ success: false, message: "Missing noidung" });

  try {
    const newChiphiTrienKhai = await ChiphiTrienKhai.findOneAndUpdate(
      {
        hopdong: hopdongId,
      },
      {
        $push: {
          chiphichung: {
            noidung,
          },
        },
        hopdong: hopdongId,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Đã thêm chi phí Triển khai",
      ChiphiTrienKhai: newChiphiTrienKhai,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/chiphitrienkhai", verifyToken, async (req, res) => {
  const { noidung, hopdongId } = req.body;
  if (!noidung)
    return res.status(400).json({ success: false, message: "Missing noidung" });

  try {
    const newChiphiTrienKhai = await ChiphiTrienKhai.findOneAndUpdate(
      {
        hopdong: hopdongId,
      },
      {
        $push: {
          chiphitrienkhai: {
            noidung,
          },
        },
        hopdong: hopdongId,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Đã thêm chi phí Triển khai",
      ChiphiTrienKhai: newChiphiTrienKhai,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/chiphichung/chiphi", verifyToken, async (req, res) => {
  const {
    noidung,
    donvi,
    dongia,
    soluong_ngay,
    soluong_luot,
    thanhtien,
    ghichu,
    dutru,
    hopdongId,
    chiphiId,
  } = req.body;
  if (!noidung)
    return res.status(400).json({ success: false, message: "Missing noidung" });
  if (!donvi)
    return res.status(400).json({ success: false, message: "Missing donvi" });

  try {
    const newChiphiTrienKhai = await ChiphiTrienKhai.findOneAndUpdate(
      {
        hopdong: hopdongId,
        "chiphichung._id": chiphiId,
      },
      {
        $push: {
          "chiphichung.$.chiphi": {
            noidung,
            donvi,
            dongia,
            soluong_ngay,
            soluong_luot,
            thanhtien,
            ghichu,
            dutru,
          },
        },
        hopdong: hopdongId,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Đã thêm chi phí Triển khai",
      ChiphiTrienKhai: newChiphiTrienKhai,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/chiphitrienkhai/chiphi", verifyToken, async (req, res) => {
  const {
    noidung,
    donvi,
    dongia,
    soluong_ngay,
    soluong_luot,
    thanhtien,
    ghichu,
    dutru,
    hopdongId,
    chiphiId,
  } = req.body;
  if (!noidung)
    return res.status(400).json({ success: false, message: "Missing noidung" });
  if (!donvi)
    return res.status(400).json({ success: false, message: "Missing donvi" });

  try {
    const newChiphiTrienKhai = await ChiphiTrienKhai.findOneAndUpdate(
      {
        hopdong: hopdongId,
        "chiphitrienkhai._id": chiphiId,
      },
      {
        $push: {
          "chiphitrienkhai.$.chiphi": {
            noidung,
            donvi,
            dongia,
            soluong_ngay,
            soluong_luot,
            thanhtien,
            ghichu,
            dutru,
          },
        },
        hopdong: hopdongId,
        user: req.userId,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      message: "Đã thêm chi phí Triển khai",
      ChiphiTrienKhai: newChiphiTrienKhai,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
