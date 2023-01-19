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
app.post("/api/forms/Guarantee-letter-cost/post",authJwt.verifyToken,
GuaranteeLetterCostController.insertGuaranteeLetterCost);


// Get all GuaranteeLetterCost 
// access public
app.get("/api/forms/Guarantee-letter-cost",//authJwt.verifyToken,
GuaranteeLetterCostController.getAllGuaranteeLetterCost);

// Get GuaranteeLetterCost by id
// access public
app.get("/api/forms/Guarantee-letter-cost/:id",//authJwt.verifyToken,
GuaranteeLetterCostController.getGuaranteeLetterCost);

// Get GuaranteeLetterCost by idContract
// access public
app.get("/api/forms/Guarantee-letter-cost/contract/:idContract",//authJwt.verifyToken,
GuaranteeLetterCostController.getGuaranteeLetterCost_ContractID);


// Update GuaranteeLetterCost 
// access public
app.put("/api/forms/Guarantee-letter-cost/put/:id",authJwt.verifyToken,
GuaranteeLetterCostController.updateGuaranteeLetterCost);

// Delete GuaranteeLetterCost 
// access public
app.delete("/api/forms/Guarantee-letter-cost/delete/:id",authJwt.verifyToken,
GuaranteeLetterCostController.deleteGuaranteeLetterCost);


//==================== Routes Private Access ====================//


}//end Routes