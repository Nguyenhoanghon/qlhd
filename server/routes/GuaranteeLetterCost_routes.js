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

// Create GuaranteeLetterCost 
//URL access: 
// access public
app.post("/api/forms/Guarantee-letter-cost/post",
GuaranteeLetterCostController.insertGuaranteeLetterCost);


// Get all GuaranteeLetterCost 
// access public
app.get("/api/forms/Guarantee-letter-cost",
GuaranteeLetterCostController.getAllGuaranteeLetterCost);

// Get GuaranteeLetterCost by id
// access public
app.get("/api/forms/Guarantee-letter-cost/:id",
GuaranteeLetterCostController.getGuaranteeLetterCost);


// Update GuaranteeLetterCost 
// access public
app.put("/api/forms/Guarantee-letter-cost/put/:id",
GuaranteeLetterCostController.updateGuaranteeLetterCost);

// Delete GuaranteeLetterCost 
// access public
app.delete("/api/forms/Guarantee-letter-cost/delete/:id",
GuaranteeLetterCostController.deleteGuaranteeLetterCost);



// Create GuaranteeLetterCost 
// access public
app.get("/api/GuaranteeLetterCost/check",
GuaranteeLetterCostController.check);

//==================== Routes Private Access ====================//


}//end Routes