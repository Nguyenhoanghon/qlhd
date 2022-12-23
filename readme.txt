ProductCost
ProductName: String,
    Quantity: Number,
    EX_W: Boolean, // nhap tu nuoc ngoai = true
    FOBCost: Number, //if(EX_W = =true, req.body.FOBCost, 0)
    RatioUSD: Number, //if(EX_W = =true, req.body.RatioUSD, 0)
    InputPrice: Number, // = if(EX_W == true, FOBCost * RatioUSD , req.body.InputPrice)
    OutputPrice: Number, // Nhap
    InputIntoMoney: Number, // Can tinh  = Quantity * InputPrice
    OutputIntoMoney: Number, //Can tinh =  Quantity * OutputPrice
    Insurance: Boolean,
    Incentive: Number,
    Note: String,
    ContractID

1. Chi phí chi tiết hàng hoá - ProductCost
2. Chi phí triển khai - ImplementationCost
3. Chi phí vốn - CapitalExpenditure
4. Manday kỹ sư - MandayCost
5. Chi phí làm thư bảo lãnh - GuaranteeLetterCost
6.  Chi phí phòng ban - DepartmentCost
7. Chi phí vật tư phụ - AuxiliaryCost
8. Chi phí khác - MiscExpense
9. Form tổng thể - Summary

//test
// Create Contract
// @access Public
exports.postContract = async (req, res) => {
    //console.log("Test route ===> addContract is called !");
    const { 
        Center,
        Deparment,
        CustomerID,
        ContractID,
        Date,
        user
    } = req.body

    const newContract = new Contract({
        Center,
        Deparment,
        CustomerID,
        ContractID,
        Date
    })
    console.log("test data ====>>>",newContract)
    try {
        Users.find({username: req.body.user},(err,user)=>{
         if(user.length!=0){
            newContract.save((err, Contract) => {
                 if (err) {
                     res.status(500).send({ message: err });
                     return;
                 }
                 newContract.user = Users.map(user => user._id);
                 newContract.save(err => {
                             if (err) {
                                 res.status(500).send({ message: err });
                                 return;
                             }
                             res.json({ success: true,message: "Contract was registered successfully!", MiscExpense: newMiscExpense }) 
                         });
             });
         }
         else 
         res.json({ success: false ,message: "Not found User "}) 
         
         });
     } catch (error) {
         console.log(error)
         res.status(500).json({ success: false, message: 'Internal server error' })
     }
}