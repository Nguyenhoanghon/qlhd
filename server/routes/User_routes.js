const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const userController = require("../controllers/user_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//Get all users 
// access public
  app.get("/api/users/getAllUsers",
  userController.getAllUsers);

//Get all users login
// access private
app.get("/api/users/view", [authJwt.verifyToken],
userController.getAllUsers);

//Get user by IdUser login
// access private
app.get("/api/users/login", [authJwt.verifyToken],
userController.getUser_ById);

//Get user by IdUser login
// access private
app.get("/api/users/ByRole", [authJwt.verifyToken],
userController.getUser_ByRole);

//Get all users
app.get("/api/users/id", [authJwt.verifyToken], authJwt.isTongGiamDoc,
userController.getUser_ById );

// Insert User
  app.post("/api/users/insertUser",// [authJwt.verifyToken],
  [
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
  ],
  userController.insertUser);

//Delete User by id
app.delete("/api/users/deleteUser/:id", [authJwt.verifyToken],
userController.deleteUser);

//Udate User by id
app.put("/api/users/updateUser/:id", [authJwt.verifyToken],
userController.updateUser);






/*
  app.get(
    "/api/test/AM",
    [authJwt.verifyToken, authJwt.isAM],
    userController.AMBoard
  );

  app.get(
    "/api/test/Manager",
    [authJwt.verifyToken, authJwt.isTruongPhong],
    userController.ManagerBoard
  );

  app.get(
    "/api/test/Director",
    [authJwt.verifyToken, authJwt.isGiamDoc],
    userController.DirectorBoard
  );

  app.get(
    "/api/test/CEO",
    [authJwt.verifyToken, authJwt.isTongGiamDoc,],
    userController.CEOBoard
  );
  

  //app.get("/api/all", controller.allAccess);
  app.get("/api/test/all", userController.allAccess);
*/

};