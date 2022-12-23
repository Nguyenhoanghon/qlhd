const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const ContractController = require("../controllers/Contract_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//


// Create Contract 
// access public
app.post("/api/forms/contract/post",[verifySignUp.checkDuplicateContract],
ContractController.insertContract);

// Get all Contract 
// access public
app.get("/api/forms/contract",
ContractController.getAllContract);

// Get all Contract 
// access public
app.get("/api/forms/contract/:id",
ContractController.getContract);


// Update Contract 
// access Public
app.put("/api/forms/contract/put/:id",
ContractController.updateContract);

// Delete Contract 
// access public
app.delete("/api/forms/contract/delete/:id",
ContractController.deleteContract);




//==================== Routes Private Access ====================//

// Get all Contract  
// access public
app.get("/api/Contract/find/:id",
ContractController.findContract);


// Create Contract 
// access private 
app.post("/api/contract/registerContract", [authJwt.verifyToken], [verifySignUp.checkDuplicateContract],
ContractController.registerContract);

// Update Contract 
// access Private
app.put("/api/Contract/Update/:id",[authJwt.verifyToken],
ContractController.updateContract);

// Delete Contract 
// access Private
app.delete("/api/Contract/DeletePrivate/:id", [authJwt.verifyToken],
ContractController.deleteContract);

}//end Routes