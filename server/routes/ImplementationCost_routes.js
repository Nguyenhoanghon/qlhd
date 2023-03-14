const { authJwt } = require("../middleware");
const ImplementationCostController = require("../controllers/ImplementationCost_controller");

const Implementation_CostController = require("../controllers/Implementation_Cost_controller");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//
//### KHOI TAO 1 CHI TIET TRIEN KHAI với tên Hạng mục và 
// API access: 
// Test: ok
app.post("/api/forms/implementation_category/post/", //:idcontract",// authJwt.verifyToken,
Implementation_CostController.create_Implementation_Category);

//### CAP NHAT TEN DANG MUC VOI idImplementation_Cost
// API access: 
// Test: ok
app.put("/api/forms/implementation_category/put/:idImplementation_Cost", //:idcontract",// authJwt.verifyToken,
Implementation_CostController.update_Implementation_Category);

//### XOA TEN DANG MUC VOI idImplementation_Cost
// API access: 
// Test: ok
app.delete("/api/forms/implementation_category/delete/:idImplementation_Cost", //:idcontract",// authJwt.verifyToken,
Implementation_CostController.delete_Implementation_Category);



//### Get ImplementationCost by idcontract
//### API access: http://localhost:5000/api/forms/implementations/6402f614416c1d823c301cc0
//### Test: ok
app.get("/api/forms/implementations/:idcontract",
Implementation_CostController.getImplementation_Cost_idcontract);

//### Get all ImplementationCost by idcontract
//### API access: http://localhost:5000/api/forms/implementations/
//### Test: ok
app.get("/api/forms/implementations/",
Implementation_CostController.getAllImplementation_Cost);

//### Them 1 giai doan chi phi
// API access: 
// Test: ok
app.post("/api/forms/implementations/stages_implementation/post/",//:idImplementation_Cost",// authJwt.verifyToken,
Implementation_CostController.create_StagesImplementation);

// CAP NHAT TEN giai doan chi phi
// @access Public
// Test: ok
app.put("/api/forms/implementations/stages_implementation/put/:idImplementation_Cost/:idContentCost",
Implementation_CostController.update_Stages_Implementation_Content);

// Xoa 1 giai doan voi idgiaidoan
// API access: /api/forms/implementation-cost/content-cost/delete/:idImplementationCost/:idContentCost
// access public
app.delete("/api/forms/implementations/stages_implementation/delete/:idImplementation_Cost/:idContentCost", 
Implementation_CostController.delete_Stages_Implementation_Content);


//======================


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
app.put("/api/forms/implementation-cost/general-expense/cost/put/:idcontract/:idContentCost/:idCost",
ImplementationCostController.update_GeneralExpense_Cost);

// CAP NHAT 1 chi phi trong giai doan chi phi CHUNG voi idcontract/idContentCost/idCost
// URL access: PUT http://localhost:5000/api/forms/implementation-cost/general-expense/put/:id
// access public
app.put("/api/forms/implementation-cost/stages-implementation/cost/put/:idcontract/:idContentCost/:idCost",
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