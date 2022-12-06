const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const argon2 = require("argon2");
var bcrypt = require("bcryptjs");
const dcConfig = require("./Config/db.config");
require("dotenv").config();
const Role = require("./models/Role_Model")
const User = require("./models/User_Model")



//Các Controller
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
      //ket noi Mongodb on cloud
      //`mongodb+srv://nhhon:g20hjiAEOxm21tBK@cluster0.wuapvu5.mongodb.net/?retryWrites=true&w=majority`,{
      //ket noi Mongodb on local
      `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
      //  `mongodb://${dcConfig.HOST}:${dcConfig.PORT}/${dcConfig.DB}`,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    );
    initial();
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

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        roleId: 0,
        nameRole: "User"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added role 'Nhanvien' ");
      });
      new Role({
        roleId: 1,
        nameRole: "AM"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added role 'AM'");
      });

      new Role({
        roleId: 2,
        nameRole: "Manager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added role 'Manager'");
      });

      new Role({
        roleId: 3,
        nameRole: "Director"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added role 'Director' ");
      });
      new Role({
        roleId: 4,
        nameRole: "CEO"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added role 'CEO' ");
      });

      new User({
        username: "nhanvien",
        email: "nhanvien@gmail.com",
        password:bcrypt.hashSync("123", 8)
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Account 'nhanvien' ");
      });

      new User({
        username: "AM",
        email: "AM@gmail.com",
        password:bcrypt.hashSync("123", 8)
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Account 'AM' ");
      });

      new User({
        username: "manager",
        email: "manager@gmail.com",
        password:bcrypt.hashSync("123", 8)
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Account 'manager' ");
      });
      new User({
        username: "director",
        email: "director@gmail.com",
        password:bcrypt.hashSync("123", 8)
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Account 'director' ");
      });
      new User({
        username: "CEO",
        email: "CEO@gmail.com",
        password:bcrypt.hashSync("123", 8)
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added Account 'CEO' ");
      });
    }
  });
}
