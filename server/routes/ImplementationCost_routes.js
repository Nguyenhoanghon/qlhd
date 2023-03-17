const { authJwt } = require("../middleware");

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

// Add AddCostDetail vao chi phi giai doan
// URL access: POST http://localhost:5000/api/forms/implementation-cost/stages-implementation/post/:idImplementationCost/:idContentCost
// Test: ok
app.post("/api/forms/implementations/stages_implementation/CostDetail/post/",///:idImplementationCost/:idContentCost", //authJwt.verifyToken,
Implementation_CostController.Add_CostDetail);

// CAP NHAT 1 chi phi trong giai doan chi phi CHUNG voi idcontract/idContentCost/idCost
// URL access: PUT http://localhost:5000/api/forms/implementation-cost/general-expense/put/:id
// access public
app.put("/api/forms/implementations/stages_implementation/CostDetail/put/:idImplementation_Cost/:idContentCost/:idCost",
Implementation_CostController.update_CostDetail);

// XOA 1 chi phi trong giai doan chi phi voi :idImplementation_Cost/:idContentCost/:idCost
// URL access: 
// access public
app.delete("/api/forms/implementations/stages_implementation/CostDetail/delete/:idImplementation_Cost/:idContentCost/:idCost",
Implementation_CostController.delete_CostDetail);


//======================  14-3


} //end Routes