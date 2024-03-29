const { authJwt } = require("../middleware");
const MiscExpenseController = require("../controllers/MiscExpense_controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

//==================== Routes Public Access ====================//

// Create MiscExpense By id contract
// access public
app.post("/api/forms/misc-expense/post",//authJwt.verifyToken,
MiscExpenseController.addMiscExpenseCost);


// Get all MiscExpense 
// access public
app.get("/api/forms/misc-expense", //authJwt.verifyToken,
MiscExpenseController.getAllMiscExpense);

// Get MiscExpense by id
// access public
app.get("/api/forms/misc-expense/:id", //authJwt.verifyToken,
MiscExpenseController.getMiscExpense);

// Get MiscExpense by id HD
// access public
app.get("/api/forms/misc-expense/contract/:id", //authJwt.verifyToken,
MiscExpenseController.getMiscExpense_ContractID);

// Update MiscExpense 
// access public
app.put("/api/forms/misc-expense/put/:id", authJwt.verifyToken,
MiscExpenseController.updateMiscExpense);

// Delete MiscExpense 
// access public
app.delete("/api/forms/misc-expense/delete/:id", authJwt.verifyToken,
MiscExpenseController.deleteMiscExpense);


//==================== Routes Private Access ====================//


}//end Routes