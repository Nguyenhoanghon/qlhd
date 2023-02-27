const { authJwt } = require("../middleware");
const AuxiliaryCostController = require("../controllers/AuxiliaryCost_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//

// Create AuxiliaryCost bi idcontract
// URL access: POST http://localhost:5000/api/forms/auxiliary-cost/post/:idcontract
// access public
//recheck: ok
app.post("/api/forms/auxiliary-cost/post/:idcontract",
AuxiliaryCostController.create_AuxiliaryCost);

// Update Revenue in AuxiliaryCost by idcontract
// URL access: 
// access public
//Recheck:
app.put("/api/forms/auxiliary-cost/put/:idcontract",
AuxiliaryCostController.update_AuxiliaryCost_Revenue);

// Update Plan in AuxiliaryCost by idcontract
// URL access: 
// access public
//Recheck:
app.put("/api/forms/auxiliary-cost/put/plan/:idcontract",
AuxiliaryCostController.update_AuxiliaryCost_Plan);


// Add Cost in ListCost by idcontract
// URL access: POST http://localhost:5000/api/forms/auxiliary-cost/post/cost/:idcontract
// access public
//Recheck: ok
app.post("/api/forms/auxiliary-cost/post/cost/:idcontract",
AuxiliaryCostController.add_AuxiliaryCost_Cost);


// Update Cost in ListCost by idcontract/idcost
// URL access: POST http://localhost:5000/api/forms/auxiliary-cost/put/cost/:idcontract
// access public
//Recheck:
app.put("/api/forms/auxiliary-cost/put/cost/:idcontract/:idCost",
AuxiliaryCostController.update_AuxiliaryCost_Cost);


// Get all AuxiliaryCost
// URL access: GET http://localhost:5000/api/forms/auxiliary-cost
// access public
app.get("/api/forms/auxiliary-cost",
AuxiliaryCostController.getAllAuxiliaryCost);

// Get AuxiliaryCost By id
// URL access: GET http://localhost:5000/api/forms/auxiliary-cost/id
// access public
app.get("/api/forms/auxiliary-cost/:id",
AuxiliaryCostController.getAuxiliaryCost_byid);

// Get AuxiliaryCost By idContract
// URL access: GET http://localhost:5000/api/forms/auxiliary-cost/contract/id
// access public
app.get("/api/forms/auxiliary-cost/contract/:id",
AuxiliaryCostController.getAuxiliaryCost_byidContract);


// Delete AuxiliaryCost by id_Auxiliary
// URL access: POST http://localhost:5000/api/forms/auxiliary-cost/delete/:id_Auxiliary
// access public
//Recheck: ok
app.delete("/api/forms/auxiliary-cost/delete/:id_Auxiliary",
AuxiliaryCostController.deleteAuxiliaryCost_id_Auxiliary);

// Delete AuxiliaryCost by id_contract
// URL access: POST http://localhost:5000//api/forms/auxiliary-cost/delete/contract/:id_Contract
// access public
//Recheck: ok
app.delete("/api/forms/auxiliary-cost/delete/contract/:id_Contract",
AuxiliaryCostController.deleteAuxiliaryCost_id_Contract);

// delete Cost in Listcosts by idcontract/idcost
// URL access: POST http://localhost:5000//api/forms/auxiliary-cost/delete/contract/:id_Contract
// access public
//Recheck: ok
app.delete("/api/forms/auxiliary-cost/delete/contract/:idcontract/:idCost",
AuxiliaryCostController.deleteAuxiliaryCost_Cost);

//==================== Routes Private Access ====================//

// Export CSV
// URL access: POST http://localhost:5000/api/forms/auxiliary-cost/export
// access public
// Test: 
app.delete("/api/forms/auxiliary-cost/export",
AuxiliaryCostController.exportAuxiliaryCost);

} //end Routes