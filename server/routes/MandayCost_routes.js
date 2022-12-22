const { authJwt } = require("../middleware");
const MandayCostController = require("../controllers/MandayCost_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//

// Get all MandayCost 
// access public
app.get("/api/MandayCost/getAllMandayCost",
MandayCostController.getAllMandayCost);

// Create MandayCost 
// access public
app.post("/api/MandayCost/insertMandayCost",
MandayCostController.insertMandayCost);


// Update MandayCost 
// access public
app.put("/api/MandayCost/updateMandayCost/:id",
MandayCostController.updateMandayCost);

// Delete MandayCost 
// access public
app.delete("/api/MandayCost/deleteMandayCost/:id",
MandayCostController.deleteMandayCost);



//==================== Routes Private Access ====================//


}//end Routes