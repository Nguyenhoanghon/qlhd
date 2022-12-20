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
app.get("/api/miscexpense/getAllMiscExpense",
MiscExpenseController.getAllMiscExpense);

// Create MiscExpense 
// access public
app.post("/api/miscexpense/insertMiscExpense",
MiscExpenseController.insertMiscExpense);


// Update MiscExpense 
// access public
app.put("/api/miscexpense/updateMiscExpense/:id",
MiscExpenseController.updateMiscExpense);

// Delete MiscExpense 
// access public
app.delete("/api/miscexpense/deleteMiscExpense/:id",
MiscExpenseController.deleteMiscExpense);



// Create MiscExpense 
// access public
app.get("/api/miscexpense/check",
MiscExpenseController.check);

//==================== Routes Private Access ====================//


}//end Routes