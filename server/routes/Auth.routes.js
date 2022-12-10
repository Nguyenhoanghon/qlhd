const { verifySignUp } = require("../middleware");
const {authJwt} = require("../middleware")
const controller = require("../controllers/auth.controller");
const db = require("../models");
const User = db.user;

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.register
  );

  app.post("/api/auth/login", controller.login);

  app.get("/api/auth/", authJwt.verifyToken, controller.checklogin ); 

};
