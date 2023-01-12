const { authJwt } = require("../middleware");
const MandayCostController = require("../controllers/MandayCost_controller");

module.exports = function(app) {
  /*
  app.use(function(req, res, next) {
    
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    
    next();
  });
  */

  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });

//==================== Routes Public Access ====================//

// Get all MandayCost
// URL access: GET http://localhost:5000/api/forms/manday-cost
// access public
app.get("/api/forms/manday-cost",authJwt.verifyToken,
MandayCostController.getAllMandayCost);

// Get MandayCost By id
// URL access: GET http://localhost:5000/api/forms/manday-cost/id
// access public
app.get("/api/forms/manday-cost/:id",
MandayCostController.getMandayCost);

// Create MandayCost 
// URL access: POST http://localhost:5000/api/forms/manday-cost/post
// access public
app.post("/api/forms/manday-cost/post/",
MandayCostController.insertMandayCost);


// Update MandayCost 
// URL access: PUT http://localhost:5000/api/forms/manday-cost/put/ID
// access public
app.put("/api/forms/manday-cost/put/:id",
MandayCostController.updateMandayCost);

// Delete MandayCost 
// URL access: POST http://localhost:5000/api/forms/manday-cost/delete/ID
// access public
app.delete("/api/forms/manday-cost/delete/:id",
MandayCostController.deleteMandayCost);



//==================== Routes Private Access ====================//


} //end Routes