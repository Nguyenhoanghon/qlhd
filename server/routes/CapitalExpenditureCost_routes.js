const { authJwt } = require("../middleware");
const { verifySignUp } = require("../middleware");
const CapitalExpenditureCostController = require("../controllers/CapitalExpenditureCost_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//

// Get all CapitalExpenditureCost
// URL access: GET http://localhost:5000/api/forms/manday-cost
// access public
app.get("/api/forms/capital-expenditure-cost",
CapitalExpenditureCostController.getAllCapitalExpenditureCost);

// Get CapitalExpenditureCost By _idCapitalExpenditureCost
// URL access: GET http://localhost:5000/api/forms/manday-cost/id
// access public
app.get("/api/forms/capital-expenditure-cost/:id",
CapitalExpenditureCostController.getCapitalExpenditureCost_byid);

// Get CapitalExpenditureCosts By contract
// URL access: GET http://localhost:5000/api/forms/manday-cost/id
// access public
app.get("/api/forms/capital-expenditure-cost/contract/:idcontract",
CapitalExpenditureCostController.getCapitalExpenditureCost_byidContract);

// Create CapitalExpenditureCost 
// URL access: POST http://localhost:5000/api/forms/manday-cost/post
// access public
app.post("/api/forms/capital-expenditure-cost/post",[verifySignUp.checkDuplicateContract_id],
CapitalExpenditureCostController.addCapitalExpenditureCost);


// Update CapitalExpenditureCost 
// URL access: PUT http://localhost:5000/api/forms/manday-cost/put/ID
// access public
app.put("/api/forms/capital-expenditure-cost/put/:id",
CapitalExpenditureCostController.updateCapitalExpenditureCost);

// Delete CapitalExpenditureCost 
// URL access: POST http://localhost:5000/api/forms/manday-cost/delete/ID
// access public
app.delete("/api/forms/capital-expenditure-cost/delete/:id",
CapitalExpenditureCostController.deleteCapitalExpenditureCost);



//==================== Routes Private Access ====================//


} //end Routes