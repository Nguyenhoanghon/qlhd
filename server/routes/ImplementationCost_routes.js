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

//### Get all  ImplementationCost
//### API access: /api/forms/implementation-cost
//### Test: ok
app.get("/api/forms/implementation-cost",
ImplementationCostController.getAllImplementationCost);

//### Get ImplementationCost by idcontract
//### API access: /api/forms/implementation-cost/:idcontract
//### Test: ok
app.get("/api/forms/implementation-cost/:idcontract",
ImplementationCostController.getImplementationCost_idcontract);


//Get  tstca chi phi trong 1 giai doan với params_idImplementation  và params id_Stage
//@Access Public
// test: chưa
//app.get("/api/forms/implementation-cost/contract/:id/:ContentCostId",
//ImplementationCostController.getImplementationCost_ContentCostId);


//### KHOI TAO 1 CHI TRIEN KHAI
// API access: /api/forms/implementation-cost/post:idcontract
// Test: ok
app.post("/api/forms/implementation-cost/post/:idcontract",// authJwt.verifyToken,
ImplementationCostController.createImplementationCost);

//### Them 1 giai doan chi phi chung
// API access: /api/forms/implementation-cost/general-expense/post/:idcontract
// Test: ok
app.post("/api/forms/implementation-cost/general-expense/post/:idcontract",// authJwt.verifyToken,
ImplementationCostController.createGeneralExpense);

//### Them 1 giai doan chi phi chung
// API access: /api/forms/implementation-cost/general-expense/post/:idcontract
// Test: ok
app.post("/api/forms/implementation-cost/stages-implementation/post/:idcontract",// authJwt.verifyToken,
ImplementationCostController.createStagesImplementation);

//###Them 1 chi phi vao giai doan chi phi chung
// API access: /api/forms/implementation-cost/general-expense/post/:idImplementationCost/:idContentCost
// Test: ok
app.post("/api/forms/implementation-cost/general-expense/post",///:idImplementationCost/:idContentCost", //authJwt.verifyToken,
ImplementationCostController.AddCostDetail);

// Add AddCostDetail vao chi phi giai doan
// URL access: POST http://localhost:5000/api/forms/implementation-cost/stages-implementation/post/:idImplementationCost/:idContentCost
// Test: ok
app.post("/api/forms/implementation-cost/stages-implementation/post",///:idImplementationCost/:idContentCost", //authJwt.verifyToken,
ImplementationCostController.AddCostDetailStage);

// CAP NHAT 1 giai doan chi phi chung
// @access Public
// OK
app.put("/api/forms/implementation-cost/general-expense/put/:idImplementationCost/:idContentCost",
ImplementationCostController.update_GeneralExpense_Content);

// CAP NHAT 1 giai doan chi phi TRIEN KHAI
// @access Public
// !!!!
app.put("/api/forms/implementation-cost/stages-implementation/put/:idImplementationCost/:idContentCost",
ImplementationCostController.update_StagesImplementation_Content);


// CAP NHAT 1 chi phi trong giai doan chi phi CHUNG voi idcontract/idContentCost/idCost
// URL access: PUT http://localhost:5000/api/forms/implementation-cost/general-expense/put/:id
// access public
app.put("/api/forms/implementation-cost/general-expense/cost/put/",//:idcontract/:idContentCost/:idCost",
ImplementationCostController.update_GeneralExpense_Cost);

// CAP NHAT 1 chi phi trong giai doan chi phi CHUNG voi idcontract/idContentCost/idCost
// URL access: PUT http://localhost:5000/api/forms/implementation-cost/general-expense/put/:id
// access public
app.put("/api/forms/implementation-cost/stages-implementation/cost/put/",//:idcontract/:idContentCost/:idCost",
ImplementationCostController.update_StagesImplementation_Cost);





// Delete ImplementationCost by idcontract
// API access: /api/forms/implementation-cost/delete/:id
// Test: ok
app.delete("/api/forms/implementation-cost/delete/:id",
ImplementationCostController.deleteImplementationCost);

// Xoa 1 giai doan voi id giaidoan
// API access: /api/forms/implementation-cost/content-cost/delete/:idImplementationCost/:idContentCost
// access public
app.delete("/api/forms/implementation-cost/content-cost/delete/:idImplementationCost/:idContentCost", 
ImplementationCostController.deleteImplementationCost_ContentCost);

// Xoa 1 chi phi trong 1 giai doan voi id chi phi CostDetail_id
// API access: /api/forms/implementation-cost/general-cost-detail/delete/:idImplementationCost/:idContentCost/:id
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
//app.get("/api/forms/product-cost/:ContractID",
//ImplementationCostController.getImplementationCost_ContractID);


} //end Routes