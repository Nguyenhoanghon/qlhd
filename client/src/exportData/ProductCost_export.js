import { React, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { ProductCostContext } from '../contexts/ProductCostContext'

//Export excel
import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

const ProductCost_export = () => {
    const {
        ProductCostState: { ProductCosts },
        getProductCost_idContract, //function
        Sum_InputIntoMoney, //function
        Sum_OutputIntoMoney, //function

    } = useContext(ProductCostContext)
    const params = useParams();
    useEffect(() => getProductCost_idContract(params.idcontract), [])
    //*** Export excel
    function returnIncentive(Product) {
        let Incentive = ""
        Product.map(element => {
            Incentive = element.Incentive
        })
        return Incentive;
    }
    let stt = 1;
    const title_Table = [
        { title: "STT", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 125 } }, // width in pixels
        { title: "Tên hàng", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 125 } }, // width in pixels
        { title: "Số lượng", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wch: 30 } }, // width in characters
        { title: "Đơn giá FOB (EX-W)", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
        { title: "Đơn giá kho", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
        { title: "Thành tiền giá kho", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
        { title: "Đơn giá bán", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
        { title: "Thành tiền giá bán", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
        { title: "Hàng hóa Có tính Chi Phí Bảo Hiểm không", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
        { title: "RatioUSD", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
        { title: "Ghi chú", style: { font: { sz: "15", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
    ]
    const Datarows = [];

    ProductCosts.map((element) => element.ListProducts.map(Product =>
        Datarows.push([
            { value: stt++, style: { font: { sz: "14" } } },
            { value: Product.ProductName, style: { font: { sz: "14" } } },
            { value: Product.Quantity, style: { font: { sz: "14" } } },
            { value: Product.FOBCost, style: { font: { sz: "14" } } },
            { value: Product.InputPrice, style: { font: { sz: "14" } } },
            { value: Product.InputIntoMoney, style: { font: { sz: "14" } } },
            { value: Product.OutputPrice, style: { font: { sz: "14" } } },
            { value: Product.OutputIntoMoney, style: { font: { sz: "14" } } },
            { value: Product.Insurance === true ? "Có" : "Không", style: { font: { sz: "14" } } },
            { value: Product.RatioUSD, style: { font: { sz: "14" } } },
            { value: Product.Note, style: { font: { sz: "14" } } },
        ])
    ))

    const RowTongchiphi = [
        { value: "", style: { font: { sz: "14" } } },
        { value: "TỔNG", style: { font: { sz: "14" } } },
        { value: "Tong", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: Sum_InputIntoMoney(ProductCosts), style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: Sum_OutputIntoMoney(ProductCosts), style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
    ]

    const RowIncentive = [
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "Incentive", style: { font: { sz: "14" } } },
        { value: returnIncentive(ProductCosts), style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
        { value: "", style: { font: { sz: "14" } } },
    ];
    Datarows.push(RowTongchiphi)
    Datarows.push(RowIncentive)
    //console.log("RowTongchiphiRowTongchiphi", Datarows)
    const DataSetExport = [
        {
            columns: title_Table,
            data: Datarows
        }
    ]
    console.log("DataSetExport========:", DataSetExport)

    //*** end Export excel


    return (
        <ExcelFile
            filename="Chi_tiet_hang_hoa"
            element={<button type="button" className="btn btn-danger">Export ProductCost</button>}>
            <ExcelSheet dataSet={DataSetExport} name="Chi_tiet_hang_hoa" />
        </ExcelFile>
    )
}
export default ProductCost_export
