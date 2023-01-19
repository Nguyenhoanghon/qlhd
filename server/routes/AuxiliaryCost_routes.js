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

// Get all AuxiliaryCost
// URL access: GET http://localhost:5000/api/forms/auxiliary-cost
// access public
app.get("/api/forms/auxiliary-cost",
AuxiliaryCostController.getAllAuxiliaryCost);

// Get AuxiliaryCost By id
// URL access: GET http://localhost:5000/api/forms/auxiliary-cost/id
// access public
app.get("/api/forms/auxiliary-cost/:id",
AuxiliaryCostController.getAuxiliaryCost);

// Get AuxiliaryCost By idContract
// URL access: GET http://localhost:5000/api/forms/auxiliary-cost/contract/id
// access public
app.get("/api/forms/auxiliary-cost/contract/:id",
AuxiliaryCostController.getAuxiliaryCost_byidContract);

// Get AuxiliaryCost By idContract and plan
// URL access: GET http://localhost:5000/api/forms/auxiliary-cost/contract/:id/:plan
// access public
app.get("/api/forms/auxiliary-cost/contract/:id/:plan",
AuxiliaryCostController.getAuxiliaryCost_byidContract_plan);

// Create AuxiliaryCost 
// URL access: POST http://localhost:5000/api/forms/auxiliary-cost/post
// access public
app.post("/api/forms/auxiliary-cost/post",
AuxiliaryCostController.insertAuxiliaryCost);


// Update AuxiliaryCost 
// URL access: PUT http://localhost:5000/api/forms/manday-cost/put/ID
// access public
app.put("/api/forms/auxiliary-cost/put/:id",
AuxiliaryCostController.updateAuxiliaryCost);

// Delete AuxiliaryCost 
// URL access: POST http://localhost:5000/api/forms/manday-cost/delete/ID
// access public
app.delete("/api/forms/auxiliary-cost/delete/:id",
AuxiliaryCostController.deleteAuxiliaryCost);



//==================== Routes Private Access ====================//


} //end Routes