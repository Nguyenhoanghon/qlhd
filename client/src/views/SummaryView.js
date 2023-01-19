
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Toast from 'react-bootstrap/Toast'
import Table from 'react-bootstrap/Table'

//Contexts
import { AuthContext } from '../contexts/AuthContext'
import { ContractContext } from '../contexts/ContractContext'
import { ProductCostContext } from '../contexts/ProductCostContext'
import { MandayCostContext } from '../contexts/MandayCostContext'
import { GuaranteeLetterCostContext } from '../contexts/GuaranteeLetterCostContext'
import { MiscExpenseCostContext } from '../contexts/MiscExpenseContext'
import { CapitalExpenditureCostContext } from "../contexts/CapitalExpenditureCostContext"
import { AuxiliaryCostContext } from '../contexts/AuxiliaryCostContext'
import { ImplementationCostContext } from '../contexts/ImplementationCostContext'

//Components
import { ActionButtons_Update_Delete } from '../components/contract/ActionButtons_Contract'
import AddContractModal from '../components/contract/AddContractModal'
import UpdateContractModal from '../components/contract/UpdateContractModal'



//View list các Forms cần nhập
export const Summary = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		ContractState: { Contract, Contracts, ContractsLoading },
		getContracts,
		setShowAddContractModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ContractContext)

	// Start: Get all Contracts
	useEffect(() => getContracts(), [])

	let body = null
	let stt = 1
	//const tong =  sumArray(Contracts.map((Contract) => Contract.sotien))
	if (ContractsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (Contracts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'> QUẢN LÝ HỢP ĐỒNG</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ HỢP ĐỒNG</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm! để mới
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddContractModal.bind(this, true)}
						>
							Thêm!
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {

		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'> QUẢN LÝ HỢP ĐỒNG</Card.Header>
					<Card.Body>
						<Table striped bordered hover size="sm">
							<thead >
								<tr>
									<th>STT</th>
									<th>Số hợp đồng/PO</th>
									<th>Trung tâm</th>
									<th>Phòng</th>
									<th>Khách Hàng</th>
									<th>Ngày</th>
									<th>ID</th>
								</tr>
							</thead>
							<tbody>
								{Contracts.map(Contract => (
									<tr key={Contract._id} >
										<td>{stt++}  </td>
										<td>{Contract.ContractID}</td>
										<td>{Contract.Center}</td>
										<td>{Contract.Deparment}</td>
										<td>{Contract.CustomerID}</td>
										<td>{Contract.Date}</td>
										<td>{Contract._id}</td>
										<td>
											<a href={`/summary/${Contract._id}`}>Xem PTHD</a>
											<ActionButtons_Update_Delete _id={Contract._id} />
											<a href={`/inputform/${Contract._id}`}>Nhập liệu HD</a>
										</td>

									</tr>

								))
								}

							</tbody>
						</Table>
						<Button
							variant='primary'
							onClick={setShowAddContractModal.bind(this, true)}
						>
							Thêm mới
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	}

	return (
		<>
			{body}
			<AddContractModal />

			{Contract !== null && <UpdateContractModal />}
			{/* After Contract is added, show toast */}
			<Toast
				show={show}
				style={{ position: 'fixed', top: '20%', right: '10px' }}
				className={`bg-${type} text-white`}
				onClose={setShowToast.bind(this, {
					show: false,
					message: '',
					type: null
				})}
				delay={3000}
				autohide
			>
				<Toast.Body>
					<strong>{message}</strong>
				</Toast.Body>
			</Toast>
		</>
	)
}

//View Contract_id Phân tích hợp đồng tổng thể
export const Summary_id = () => {
	const params = useParams();
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)
	//===Get data Contract with idContract
	const {
		ContractState: { Contracts },
		getContract_byid,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ContractContext)
	// Start: Get  Contracts by ID
	useEffect(() => getContract_byid(params.id), [])

	//console.log("Contract",Contracts)
	//===End Get data Contract with idContract

	//=== Get productcosts with idcontract
	const {
		ProductCostState: { ProductCost, ProductCosts, ProductCostsLoading },
		getProductCost_byidContract,
		setShowAddProductCostModal
	} = useContext(ProductCostContext)
	// hàm tính tổng thành tiền
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}

	// Start: Get ProductCosts by id Contract
	useEffect(() => getProductCost_byidContract(params.id), [])
	//tính tổng tiền bảo hiểm
	
	// hàm tính tổng thành tiền
	function sumArray2(mang) {
		let sum = 0;
		mang.forEach(function(mang) {
			if (mang[5] === true) {
				sum += mang[4]*mang[10]
			}
		})
		
		return sum;
	}
	const TotalInsurance = sumArray2(ProductCosts.map((ProductCost) => ProductCost.Insurance))
	console.log("Tông bảo hiểm", TotalInsurance)

	const TotalInputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.InputIntoMoney))//note
	const TotalOutputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney))//note
	const TotalIncentive = sumArray(ProductCosts.map((ProductCost) => ProductCost.Incentive))//note

	//=== End Get productcosts with idcontract

	//=== Get MandayCost 
	const {
		MandayCostState: { MandayCost, MandayCosts, MandayCostsLoading },
		getMandayCost_byidContract,
		setShowAddMandayCostModal
	} = useContext(MandayCostContext)
	// Start: Get all MandayCost by idContract
	useEffect(() => getMandayCost_byidContract(params.id), [])
	const TotalMandayCost = sumArray(MandayCosts.map((MandayCost) => MandayCost.IntoMoney))
	//=== End Get MandayCost

	//=== Get GuaranteeLetterCost
	const {
		GuaranteeLetterCostState: { GuaranteeLetterCost, GuaranteeLetterCosts, GuaranteeLetterCostsLoading },
		getGuaranteeLetterCost_byidContract,
		setShowAddGuaranteeLetterCostModal
	} = useContext(GuaranteeLetterCostContext)

	useEffect(() => getGuaranteeLetterCost_byidContract(params.id), [])

	const TotalGuaranteeLetterCost = sumArray(GuaranteeLetterCosts.map((GuaranteeLetterCost) => GuaranteeLetterCost.IntoMoney))

	//=== End Get GuaranteeLetterCost

	//=== Get MiscExpenseCosts
	const {
		MiscExpenseCostState: { MiscExpenseCost, MiscExpenseCosts, MiscExpenseCostsLoading },
		getMiscExpenseCost_byidContract,
		setShowAddMiscExpenseCostModal
	} = useContext(MiscExpenseCostContext)
	// Start: Get all MiscExpenseCosts
	useEffect(() => getMiscExpenseCost_byidContract(params.id), [])
	const TotalMiscExpenseCost = sumArray(MiscExpenseCosts.map((MiscExpenseCost) => MiscExpenseCost.Cost))

	//=== End Get MiscExpenseCosts

	//=== Get data CapitalExpenditureCost
	const {
		CapitalExpenditureCostState: { CapitalExpenditureCost, CapitalExpenditureCosts, CapitalExpenditureCostsLoading },
		getCapitalExpenditureCosts_byidContract
	} = useContext(CapitalExpenditureCostContext);

	// Start: Get all CapitalExpenditureCosts
	useEffect(() => getCapitalExpenditureCosts_byidContract(params.id), []);
	//=== End Get data CapitalExpenditureCost

	//=== Get data AuxiliaryCost
	const {
		AuxiliaryCostState: { AuxiliaryCost, AuxiliaryCosts, AuxiliaryCosts_plan1, AuxiliaryCosts_plan2, AuxiliaryCostsLoading },
		getAuxiliaryCosts_byidContract,
		getAuxiliaryCosts_byidContract_Plan1,
		getAuxiliaryCosts_byidContract_Plan2,
		setShowAddAuxiliaryCostModal
	} = useContext(AuxiliaryCostContext)
	//get dat AuxiliaryCosts with idContract and Plan 1
	useEffect(() => getAuxiliaryCosts_byidContract_Plan1(params.id, 1), [])
	const TotalPlan1 = sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.Cost))
	const TotalCPXLPlan1 = sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.CPXL))
	const TotalCPgrossPlan1 = sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.CPgross))
	//get dat AuxiliaryCosts with idContract and Plan 2
	useEffect(() => getAuxiliaryCosts_byidContract_Plan2(params.id, 2), [])
	const TotalPlan2 = sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.Cost))
	const TotalCPXLPlan2 = sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.CPXL))
	const TotalCPgrossPlan2 = sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.CPgross))
	//=== End Get data AuxiliaryCost

	//=== Get data ImplementationCost

	const {
		ImplementationCostState: { ImplementationCost, ImplementationCosts, ImplementationCostsLoading },
		getImplementationCosts_byidContract,
		setShowAddImplementationCostModal
	} = useContext(ImplementationCostContext)

	// Start: Get all ImplementationCosts
	useEffect(() => getImplementationCosts_byidContract(params.id), [])
	//Function TotalGeneralExpense
	function TotalStageImplementation(stage) {
		let Total = 0;
			ImplementationCosts.map(ImplementationCost => (
				ImplementationCost.StagesImplementation[stage].Costs.map(Costs => (
					Total += Costs.IntoMoney))))
							
		return Total;
	}
	//Function TotalGeneralExpense
	function TotalGeneralExpense(stage) {
		let Total = 0;
			ImplementationCosts.map(ImplementationCost => (
				ImplementationCost.GeneralExpense[stage].Costs.map(Costs => (
					Total += Costs.IntoMoney))))
							
		return Total;
	}
	const GeneralExpense = TotalGeneralExpense(0);
	const StageImplementation = TotalStageImplementation(0);
	const TotalImplementationCost = GeneralExpense + StageImplementation;

	//Chi phi tiep khach
	//Chi phí van chuyển


	//=== End Get data ImplementationCost



	//=== Data process
	// 3.
	const hieuquaduan = (TotalOutputIntoMoney - TotalInputIntoMoney) // - 1 - 2*10

	//===
	let body = null
	let stt = 1
	let TT = 1

	return (
		<>
			<Card className='text-center mx-5 my-5'>
				<Card.Header as='h2'>BẢNG PHÂN TÍCH HIỆU QUẢ HỢP ĐỒNG - DỰ ÁN </Card.Header>
				<Card.Body>
					<Table striped bordered hover size="sm">
						<thead >
							<tr>
								<th>Số hợp đồng/PO</th>
								<th>Trung tâm</th>
								<th>Phòng</th>
								<th>Khách Hàng</th>
								<th>Ngày</th>
								<th>Tỷ giá USD</th>
							</tr>
						</thead>
						<tbody>
							{Contracts.map(Contract => (
								<tr key={Contract._id}>
									<td>{Contract.ContractID}</td>
									<td>{Contract.Center}</td>
									<td>{Contract.Deparment}</td>
									<td>{Contract.CustomerID}</td>
									<td>{Contract.Date}</td>
									<td>{Contract.RatioUSD}</td>
								</tr>

							))
							}

						</tbody>
					</Table>
					<Table responsive="sm" striped bordered hover size="sm" >
						<thead>
							<tr>
								<th rowSpan="2">STT</th>
								<th rowSpan="2" width="15%">Tên hàng</th>
								<th rowSpan="2" width="5%">Số lượng </th>
								<th colSpan="3">Giá vốn hàng bán Giá kho</th>
								<th colSpan="2 ">Doanh số Giá bán</th>
								<th rowSpan="2 " width="8%">Có tính Chi Phí Bảo Hiểm  </th>
								<th rowSpan="2">Incentive</th>
								<th rowSpan="2">Tỷ giá USD</th>
								<th rowSpan="2">Ghi chú</th>
								{/*<th rowSpan="2">Thao tác</th>*/}
							</tr>
							<tr>
								<th width='8%' as='pre'>Đơn giá FOB <br />
									(EX-W)</th>
								<th>Đơn giá kho</th>
								<th>Thành tiền giá kho</th>
								<th>Đơn giá bán</th>
								<th>Thành tiền giá bán</th>
							</tr>
						</thead>
						<tbody>
							{ProductCosts.map(ProductCost => (
								<tr key={ProductCost._id} >
									<td>{TT++}  </td>
									<td>{ProductCost.ProductName}</td>
									<td>{ProductCost.Quantity.toLocaleString()}</td>
									<td>{ProductCost.FOBCost.toLocaleString()}</td>
									<td>{ProductCost.InputPrice.toLocaleString()}</td>
									<td>{ProductCost.InputIntoMoney.toLocaleString()}</td>
									<td>{ProductCost.OutputPrice.toLocaleString()}</td>
									<td>{ProductCost.OutputIntoMoney.toLocaleString()}</td>
									<td>
										{ProductCost.Insurance.toLocaleString()
										}
									</td>
									<td>{ProductCost.Incentive.toLocaleString()} </td>
									<td>{ProductCost.RatioUSD.toLocaleString()}</td>
									<td>{ProductCost.Note}  </td>
									{/*
									<td>
									<ActionButtons_ProductCost _id={ProductCost._id} />
									</td>
									*/}
								</tr>

							))
							}
							<tr>
								<td colSpan={5} >Tổng</td>
								<td>{TotalInputIntoMoney.toLocaleString()}</td>
								<td></td>
								<td>{TotalOutputIntoMoney.toLocaleString()}</td>
								<td></td>
								<td>{TotalIncentive.toLocaleString()}</td>
								<td></td>
								<td></td>

							</tr>
						</tbody>
						<tr>
							<td>1</td>
							<td colSpan={6} >Chi phí phát sinh khi thực hiện Dự Án </td>
							<td>1.1 + 1.2 + 1.3 + 1.4 + 1.5</td>
							<td>{TotalIncentive.toLocaleString()}</td>
							<td></td>
							<td></td>
						</tr>
						<tr >
							<td>1.1</td>
							<td colSpan={6} >Chi phí triển khai hợp đồng </td>
							<td>{TotalImplementationCost.toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td colSpan={2} ></td>
							<td colSpan={5} >+ Chi phí bảo hành phần cứng trích cho TT HSC 0.65%</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td colSpan={2} ></td>
							<td colSpan={5} >+ Chi phí chung</td>
							<td>{GeneralExpense.toLocaleString()}</td>
							<td>{TotalIncentive.toLocaleString()}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td colSpan={2} ></td>
							<td colSpan={5} >+ Chi phí triển khai</td>
							<td>{StageImplementation.toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						{CapitalExpenditureCosts.map((CapitalExpenditureCost) => (
							<>
								<tr key={CapitalExpenditureCost._id}>
									<td>1.2</td>
									<td colSpan={6} > Chi phí vốn</td>
									<td>{CapitalExpenditureCost.CapitalExpense.toLocaleString(2)}</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày hàng tồn kho</td>
									<td>{CapitalExpenditureCost.InventoryDays.toLocaleString()}</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày triển khai</td>
									<td>{CapitalExpenditureCost.ImplementationDays.toLocaleString()}</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày công nợ nhà cung cấp</td>
									<td>{CapitalExpenditureCost.BedtDays}</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} > + Số ngày thu nợ </td>
									<td>{CapitalExpenditureCost.DebtCollectionDays.toLocaleString()}</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Khách hàng trả trước (đặt cọc)</td>
									<td>{CapitalExpenditureCost.Deposits.toLocaleString()}</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Đặt cọc cho NTP </td>
									<td>{CapitalExpenditureCost.DepositsNTP.toLocaleString()}</td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</>
						))}
						<tr >
							<td>1.3</td>
							<td colSpan={6} >Manday thực hiện của kỹ sư HPT tham gia</td>
							<td>{TotalMandayCost.toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr >
							<td>1.4</td>
							<td colSpan={6} >Chi phí làm thư bảo lãnh (BL dự thầu, BL thực hiện HĐ, BL BH)</td>
							<td>{TotalGuaranteeLetterCost.toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr >
							<td>1.5</td>
							<td colSpan={6} > Chi phí khác</td>
							<td>{TotalMiscExpenseCost.toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>2</td>
							<td colSpan={6} >Chi phí mua vật tư phụ (dự kiến) </td>
							<td>{(TotalCPgrossPlan1 / 10).toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>3</td>
							<td colSpan={6} >Hiệu quả dự án (giá trị tuyệt đối)</td>
							<td>{hieuquaduan.toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>4</td>
							<td colSpan={6} >Hiệu quả dự án (tỉ lệ trên doanh thu)</td>
							<td>{((hieuquaduan / TotalInputIntoMoney) * 100).toFixed(2) + "%"}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Hiệu quả dự án (chưa trừ  Manday của kỹ sư HPT)</td>
							<td>{(hieuquaduan + TotalMandayCost).toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Incentive :</td>
							<td>{TotalIncentive.toLocaleString()}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Hiệu quả dự án (có Incentive):</td>
							<td>{(((hieuquaduan + TotalMandayCost) / TotalOutputIntoMoney) * 100).toFixed(2) + "%"}</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>

					</Table>
				</Card.Body>
			</Card>
		</>

	)
}




