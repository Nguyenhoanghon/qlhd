const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken],
    controller.userBoard);

  app.get(
    "/api/test/AM",
    [authJwt.verifyToken, authJwt.isAM],
    controller.AMBoard
  );

  app.get(
    "/api/test/Manager",
    [authJwt.verifyToken, authJwt.isManager],
    controller.ManagerBoard
  );

  app.get(
    "/api/test/Director",
    [authJwt.verifyToken, authJwt.isDirector],
    controller.DirectorBoard
  );

  app.get(
    "/api/test/CEO",
    [authJwt.verifyToken, authJwt.isCEO,],
    controller.CEOBoard
  );
};
