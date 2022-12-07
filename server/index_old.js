require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const authRouter = require("./routes/Auth_Route");
const postRouter = require("./routes/Post_Route");
const userRouter = require("./routes/Users_Route");
const chiphikhacRouter = require("./routes/Chiphikhac_Route");
const chiphithubaolanhRouter = require("./routes/Chiphithubaolanh_Route");
const mandaykysuRouter = require("./routes/MandayKysu_Route");
const chiPhiVon_Route = require("./routes/ChiPhiVon_Route");
const ChiTietHangHoa_Route = require("./routes/ChiTietHangHoa_Route");
const PhongbanRouter = require("./routes/Phongban_Route");
const Chiphitrienkhai_Route = require("./routes/Chiphitrienkhai_Route");
const Hopdong_Route = require("./routes/Hopdong_Route");

const connectDB = async () => {
  try {
    await mongoose.connect(
      //ket noi Mongodb on local
       `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      //     useCreateIndex: true,
      //     useNewUrlParser: true,
      //     useUnifiedTopology: true,
      //     useFindAndModify: false
      // }
      //`mongodb+srv://jimmy:BTKYUbFkVjRGgCG9@qlhd.e8f9upr.mongodb.net/dlhd?retryWrites=true&w=majority`,
      //{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.get("/", (req, res) => {
  return res.send("index server");
});
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/chiphikhac", chiphikhacRouter);
app.use("/api/chiphithubaolanh", chiphithubaolanhRouter);
app.use("/api/mandaykysu", mandaykysuRouter);
app.use("/api/chiphivon", chiPhiVon_Route);
app.use("/api/chitiethanghoa", ChiTietHangHoa_Route);
app.use("/api/phongban", PhongbanRouter);
app.use("/api/chiphitrienkhai", Chiphitrienkhai_Route);
app.use("/api/hopdong", Hopdong_Route);

const PORT = process.env.PORT; // || 5000

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
