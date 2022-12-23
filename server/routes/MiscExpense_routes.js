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

// Get all MiscExpense 
// access public
app.get("/api/forms/misc-expense",
MiscExpenseController.getAllMiscExpense);

// Get MiscExpense Byid
// access public
app.get("/api/forms/misc-expense/:id",
MiscExpenseController.getMiscExpense);

// Create MiscExpense 
// access public
app.post("/api/forms/misc-expense/post",
MiscExpenseController.insertMiscExpense);


// Update MiscExpense 
// access public
app.put("/api/forms/misc-expense/put/:id",
MiscExpenseController.updateMiscExpense);

// Delete MiscExpense 
// access public
app.delete("/api/forms/misc-expense/delete/:id",
MiscExpenseController.deleteMiscExpense);



// Create MiscExpense 
// access public
app.get("/api/miscexpense/check",
MiscExpenseController.check);

//==================== Routes Private Access ====================//


}//end Routes