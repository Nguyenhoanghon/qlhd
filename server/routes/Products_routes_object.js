const { authJwt } = require("../middleware");
const ProductsController = require("../controllers/Products_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//
/* 
// Get all ProductCost
// URL access: GET http://localhost:5000/api/forms/manday-cost
// access public
//repair
app.get("/api/forms/product-cost",
ProductsController.getAllProductCost);

// Get ProductCost By id
// URL access: GET http://localhost:5000/api/forms/product-cost/id
// access public
//repair
app.get("/api/forms/product-cost/:id",
ProductsController.getProductCost);

// Get ProductCost By ContractID
// URL access: GET http://localhost:5000/api/forms/product-cost/id
// access public
//repair
app.get("/api/forms/product-cost/contract/:contractName",
ProductsController.getProductCost_ContractID);
 */

// Create ProductCost 
// URL access: POST http://localhost:5000/api/forms/manday-cost/post
// access public
app.post("/api/forms/products/post",
ProductsController.addProducts);
/* 
// Create ProductCost by id contract
// URL access: POST http://localhost:5000/api/forms/manday-cost/post
// access public
app.post("/api/forms/product-cost/post/contract/:idcontract",
ProductsController.addProductCost);

// Update ProductCost 
// URL access: PUT http://localhost:5000/api/forms/manday-cost/put/ID
// access public
app.put("/api/forms/product-cost/contract/put/:id",
ProductsController.updateProductCost);

// Delete ProductCost 
// URL access: POST http://localhost:5000/api/forms/manday-cost/delete/ID
// access public
app.delete("/api/forms/product-cost/delete/:id",
ProductsController.deleteProductCost);



//==================== Routes Public Ham chuc nang ====================//

// Get all ProductCost
// URL access: GET http://localhost:5000/api/forms/manday-cost
// access public
app.get("/api/forms/product-cost/:ContractID",
ProductsController.getProductCost_ContractID);
 */

} //end Routes