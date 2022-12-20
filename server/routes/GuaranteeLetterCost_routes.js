const { authJwt } = require("../middleware");
const GuaranteeLetterCostController = require("../controllers/GuaranteeLetterCost_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//

// Get all GuaranteeLetterCost 
// access public
app.get("/api/GuaranteeLetterCost/getAllGuaranteeLetterCost",
GuaranteeLetterCostController.getAllGuaranteeLetterCost);

// Create GuaranteeLetterCost 
// access public
app.post("/api/GuaranteeLetterCost/insertGuaranteeLetterCost",
GuaranteeLetterCostController.insertGuaranteeLetterCost);


// Update GuaranteeLetterCost 
// access public
app.put("/api/GuaranteeLetterCost/updateGuaranteeLetterCost/:id",
GuaranteeLetterCostController.updateGuaranteeLetterCost);

// Delete GuaranteeLetterCost 
// access public
app.delete("/api/GuaranteeLetterCost/deleteGuaranteeLetterCost/:id",
GuaranteeLetterCostController.deleteGuaranteeLetterCost);



// Create GuaranteeLetterCost 
// access public
app.get("/api/GuaranteeLetterCost/check",
GuaranteeLetterCostController.check);

//==================== Routes Private Access ====================//


}//end Routes