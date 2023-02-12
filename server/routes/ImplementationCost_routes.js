const { authJwt } = require("../middleware");
const ImplementationCostController = require("../controllers/ImplementationCost_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//

// Get all ImplementationCost 
// URL access: GET http://localhost:5000/api/forms/manday-cost
// access public
//test: ok
app.get("/api/forms/implementation-cost",
ImplementationCostController.getAllImplementationCost);

// Get ImplementationCost By id ImplemetationCosts
// URL access: GET http://localhost:5000/api/forms/product-cost/id
// access public
app.get("/api/forms/implementation-cost/:id",
ImplementationCostController.getImplementationCost);

// Get ImplementationCost By id ImplemetationCosts
// URL access: GET http://localhost:5000/api/forms/implementation-cost/contract/:id
// access public
//Test: ok
app.get("/api/forms/implementation-cost/contract/:id",
ImplementationCostController.getImplementationCost_IdContract);

// Get ImplementationCost By ContractID
// URL access: GET http://localhost:5000/api/forms/product-cost/id
// access public
app.get("/api/forms/implementation-cost/contract/:contractName",
ImplementationCostController.getImplementationCost_ContractID);



// Create ImplementationCost Khoi tao giai doan
// URL access: POST http://localhost:5000/api/forms/implementation-cost/post/:idcontract
// access public
//test: ok
app.post("/api/forms/implementation-cost/post/:idcontract",// authJwt.verifyToken,
ImplementationCostController.createImplementationCost);

// Create ImplementationCost -> GeneralExpense
// URL access: POST http://localhost:5000/api/forms/implementation-cost/GeneralExpense/post/:idcontract
// access public
app.post("/api/forms/implementation-cost/GeneralExpense/post/:idcontract",// authJwt.verifyToken,
ImplementationCostController.createGeneralExpense);

// Create ImplementationCost -> createStagesImplementation
// URL access: POST http://localhost:5000/api/forms/implementation-cost/stages-implementation/post/:idcontract
// access public
app.post("/api/forms/implementation-cost/stages-implementation/post/:idcontract",// authJwt.verifyToken,
ImplementationCostController.createStagesImplementation);

// Add AddCostDetail vao chi phi Chung 
// URL access: POST http://localhost:5000/api/forms/implementation-cost/stages-implementation/post/:idcontract
// access public
app.post("/api/forms/implementation-cost/general-expense/post", //authJwt.verifyToken,
ImplementationCostController.AddCostDetail);

// Add AddCostDetail vao chi phi giai doan
// URL access: POST http://localhost:5000/api/forms/implementation-cost/stages-implementation/post/:idcontract
// access public
app.post("/api/forms/implementation-cost/stages-implementation/post/", //authJwt.verifyToken,
ImplementationCostController.AddCostDetailStage);

// Update ImplementationCost general-expense  Costs_id 
// URL access: PUT http://localhost:5000/api/forms/implementation-cost/general-expense/put/:id
// access public
app.put("/api/forms/implementation-cost/general-expense/put/:id",
ImplementationCostController.updateImplementationCost_CostGeneralExpense);

// Update ImplementationCost stages-implementation Costs_id 
// URL access: PUT http://localhost:5000/api/forms/implementation-cost/stages-implementation/put/:id
// access public
app.put("/api/forms/implementation-cost/stages-implementation/put/:id",
ImplementationCostController.updateImplementationCost_CostDetailStage);

// Delete ImplementationCost 
// URL access: POST http://localhost:5000/api/forms/implementation-cost/delete/:id
// access public
app.delete("/api/forms/implementation-cost/delete/:id",
ImplementationCostController.deleteImplementationCost);

// Xoa 1 giai doan voi id giaidoan
// URL access: POST http://localhost:5000/api/forms/implementation-cost/delete/:id
// access public
app.delete("/api/forms/implementation-cost/content-cost/delete/:idImplementationCost/:idContentCost", 
ImplementationCostController.deleteImplementationCost_ContentCost);

// Xoa 1 chi phi trong 1 giai doan voi id chi phi CostDetail_id
// URL access: POST http://localhost:5000/api/forms/implementation-cost/delete/:id
// access public 
app.delete("/api/forms/implementation-cost/general-cost-detail/delete/:idImplementationCost/:idContentCost/:id", 
ImplementationCostController.deleteImplementationCost_GeneralCostDetail);

// Xoa 1 chi phi trong 1 giai doan chi phi trien khai
// URL access: POST http://localhost:5000/api/forms/implementation-cost/delete/:id
// access public 
app.delete("/api/forms/implementation-cost/stage-cost-detail/delete/:idImplementationCost/:idContentCost/:id", 
ImplementationCostController.deleteImplementationCost_StageCostDetail);

//==================== Routes Public Ham chuc nang ====================//

// Get all ImplementationCost
// URL access: GET http://localhost:5000/api/forms/manday-cost
// access public
app.get("/api/forms/product-cost/:ContractID",
ImplementationCostController.getImplementationCost_ContractID);


} //end Routes