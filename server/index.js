const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

///
app.use(express.json());

const db = require("./models");
const Role = db.role;

db.mongoose
    //.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    .connect(`mongodb+srv://nhhon:XtojfLH4zntc5dxv@cluster0.wuapvu5.mongodb.net/?retryWrites=true&w=majority`, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome Server" });
});


// routes
require("./routes/Auth_routes")(app);
require("./routes/User_routes")(app);
require("./routes/Contract_routes")(app);
require("./routes/MiscExpense_routes")(app);
require("./routes/GuaranteeLetterCost_routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "User"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("Đã thêm quyền 'User' ");
      });
      new Role({
        name: "AM"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("Đã thêm quyền 'AM'");
      });

      new Role({
        name: "Manager"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Đã thêm quyền 'Manager'");
      });

      new Role({
        name: "Director"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Đã thêm quyền 'Director' ");
      });
      new Role({
        name: "Admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("Đã thêm quyền 'Admin' ");
      });   
    }
  });
}

