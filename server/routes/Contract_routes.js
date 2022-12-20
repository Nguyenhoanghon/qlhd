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


// Get all Contract 
// access public
app.get("/api/contract/getAllContract",
ContractController.getAllContract);

// Create Contract 
// access public
app.post("/api/Contract/insertContract",[verifySignUp.checkDuplicateContract],
ContractController.insertContract);


// Delete Contract 
// access public
app.delete("/api/Contract/Delete/:id",
ContractController.deleteContract);

// Update Contract 
// access Public
app.put("/api/Contract/Update/:id",
ContractController.updateContract);

// Get all Contract  
// access public
app.get("/api/Contract/find/:id",
ContractController.findContract);
//==================== Routes Private Access ====================//

// Get all Contract 
// access private
app.get("/api/contract/getContracts",[authJwt.verifyToken],
ContractController.getContracts);

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