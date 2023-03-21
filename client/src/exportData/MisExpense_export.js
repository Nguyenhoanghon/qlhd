import { React, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MiscExpenseCostContext from '../contexts/MiscExpenseContext'
//Export excel
import ReactExport from 'react-data-export';
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

export const MisExpense_export = () => {
    const {
        MiscExpenseCostState: {
            MiscExpenseCosts
        },
        getMiscExpenseCost_byidContract
    } = useContext(MiscExpenseCostContext)

    const [dataExport, setdataExport] = useState([]);
    const params = useParams();
    useEffect(() => {
        //goi ham
        getMiscExpenseCost_byidContract(params.id);
    }, []);
    console.log("DataExport", MiscExpenseCosts)
    let stt = 1;
	const title = [
		{ title: "STT", style: { font: { sz: "18", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 125 } }, // width in pixels
		{ title: "Nội dung", style: { font: { sz: "18", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 125 } }, // width in pixels
		{ title: "Số tiền", style: { font: { sz: "18", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wch: 30 } }, // width in characters
		{ title: "Chi phí", style: { font: { sz: "18", bold: true, color: { rgb: "ffffff" } }, fill: { patternType: "solid", fgColor: { rgb: "3461eb" } } }, width: { wpx: 100 } }, // width in pixels
		
	]
	const Datarows = MiscExpenseCosts.map((MiscExpenseCost) => [
		{ value: stt++, style: { font: { sz: "14" } } },
		{ value: MiscExpenseCost.Content, style: { font: { sz: "14" } } },
		{ value: MiscExpenseCost.Cost, style: { font: { sz: "14" } } },
		{ value: MiscExpenseCost.Note, style: { font: { sz: "14" } } },

	])
	const RowTongchiphi = [
		{ value: "", style: { font: { sz: "14" } } },
		{ value: "TỔNG", style: { font: { sz: "14" } } },
		{ value: "TotalMiscExpenseCost", style: { font: { sz: "14" } } },
		{ value: "", style: { font: { sz: "14" } } },

	]
	Datarows.push(RowTongchiphi)
	//console.log("RowTongchiphiRowTongchiphi", Datarows)
	const DataSetExport = [
		{
			columns: title,
			data: Datarows
		}
	]

    return (
        <div>
            <ExcelFile
                filename="MiscExpenseCosts"
                element={<button type="button" className="btn btn-success float-right m-3">Export Data</button>}>
                <ExcelSheet dataSet={DataSetExport} name="MiscExpenseCosts" />
            </ExcelFile>
        </div>
    )
}
