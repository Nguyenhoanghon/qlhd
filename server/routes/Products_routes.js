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

// Get all ProductCost
// URL access: GET http://localhost:5000//api/forms/products
// access public
//repair
app.get("/api/forms/products",
ProductsController.getAllProducts);

// Get ProductCost By idcontract
// URL access: GET http://localhost:5000/api/forms/product-cost/id
// access public
//repair
app.get("/api/forms/products/:idcontract",
ProductsController.getProducts_idcontract);


// create_Products
// URL access: POST http://localhost:5000/api/forms/manday-cost/post
// access public
app.post("/api/forms/products/post/:contract",
ProductsController.add_Incentive);

// Add ProductCost 
// URL access: POST http://localhost:5000/api/forms/manday-cost/post
// access public
app.post("/api/forms/detailproduct/post/:contract",
ProductsController.addProducts);


// Update_detail_Products by idcontract/idProduct
// URL access: PUT http://localhost:5000/api/forms/detailproduct/put
// access public
//Test: ok
app.put("/api/forms/detailproduct/put",
ProductsController.updateProduct_idcontract);


// Delete ProductCost by /:idProduct
// URL access: POST http://localhost:5000/api/forms/detailproduct/delete/
// access public
app.delete("/api/forms/detailproduct/delete/:idProduct",
ProductsController.deleteProduct_idProduct);

// Delete all Products by idcontract
// URL access: POST http://localhost:5000/api/forms/detailproduct/delete/
// access public
app.delete("/api/forms/products/delete/:idProducts",
ProductsController.deleteProduct);

} //end Routes