<ActionButtons_ImplementationCost _id={ImplementationCost._id} />


1. Chi phí chi tiết hàng hoá - ProductCost
2. Chi phí triển khai - ImplementationCost
3. Chi phí vốn - CapitalExpenditure
4. Manday kỹ sư - MandayCost
5. Chi phí làm thư bảo lãnh - GuaranteeLetterCost
6.  Chi phí phòng ban - DepartmentCost
7. Chi phí vật tư phụ - AuxiliaryCost
8. Chi phí khác - MiscExpense
9. Form tổng thể - Summary

1. ProductCost
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
2. ImplementationCost
    ImplementationCost
        GeneralCost: [ContentCost],
        StagesImplementation: [ContentCost],
        hopdong: {
            type: Schema.Types.ObjectId,
            ref: "hopdong",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        }

    ContentCost
        Content: String,
        Costs: [CostDetails] //các chi phí

AuxiliaryCost
    CapitalCost: Number, // Load từ form 1
    Plan: [Number] , // Lua chon gia tri, M 
    Content: String, 
    Cost: Number, // = if(Cost<1; Cost*CapitalCost ; Cost)
    CPXL: Number,
    CPgross: Number,
    Note: String,
    contract: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contract"
      }
    ]


