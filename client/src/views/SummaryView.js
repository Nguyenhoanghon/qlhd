
import { useContext, useEffect, useState } from 'react'
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
				<Card className='text-center mx-5 my-5' aninmation={false.toLocaleString()}>
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
									<th>Thao tác</th>
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
										{/* <td>{Contract._id}</td> */}
										<td>
											<a href={`/summary/${Contract._id}`}>
												<Button >
													Xem PTHD
												</Button>
											</a>
											<ActionButtons_Update_Delete _id={Contract._id} />
											<a href={`/inputform/${Contract._id}`}>
												<Button>
													Nhập liệu
												</Button>
											</a>
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

	//===Get data Contract with idContract
	const {
		ContractState: { Contracts },
		getContract_byid,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ContractContext)
	// Start: Get  Contracts by ID
	useEffect(() => getContract_byid(params.id), [])
	//===End Get data Contract with idContract

	//=== Get productcosts with idcontract
	const {
		ProductCostState: { ProductCost, ProductCosts, ProductCostsLoading },
		getProductCost_idContract,
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
	useEffect(() => getProductCost_idContract(params.id), [])

	//Ham checkbox Insurance
	const [stateInsurance, setStateInsurance] = useState(false)
	const toggleInsurance = (value) => {
		setStateInsurance(value);
	};
	//Ham tinh tong Phan tử trong kieu mang 
	function Sum_InputIntoMoney(ProductsCost) {
		let Total_InputIntoMoney = 0;
		ProductsCost.map(Products =>
			Products.ListProducts.map(ListProduct => (
				Total_InputIntoMoney += ListProduct.InputIntoMoney
			)))

		return Total_InputIntoMoney;
	}
	//Ham tinh tong Phan tử trong kieu mang 
	function Sum_OutputIntoMoney(ProductsCost) {
		let Total_OutputIntoMoney = 0;
		ProductsCost.map(Products =>
			Products.ListProducts.map(ListProduct => (
				Total_OutputIntoMoney += ListProduct.OutputIntoMoney
			)))

		return Total_OutputIntoMoney;
	}

	//Tinh tong thanh tien gia ban voi Insurance = true
	function Sum_Insurance(ProductsCost) {
		let Total_Insurance = 0;
		ProductsCost.map(Products =>
			Products.ListProducts.map(ListProduct => (
				ListProduct.Insurance === true ? Total_Insurance += ListProduct.OutputIntoMoney : 0
			)))

		return Total_Insurance;
	}

	const TotalInsurance = 0.0065 * Sum_Insurance(ProductCosts)

	const TotalInputIntoMoney = Sum_InputIntoMoney(ProductCosts)
	const TotalOutputIntoMoney = Sum_OutputIntoMoney(ProductCosts)
	const TotalIncentive = sumArray(ProductCosts.map((ProductCost) => ProductCost.Incentive))//note
	console.log("TotalInsurance===: ", TotalInsurance)
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
	console.log("TotalMandayCost===: ", TotalMandayCost)
	//=== End Get MandayCost

	//=== Get GuaranteeLetterCost
	const {
		GuaranteeLetterCostState: { GuaranteeLetterCost, GuaranteeLetterCosts, GuaranteeLetterCostsLoading },
		getGuaranteeLetterCost_byidContract,
		setShowAddGuaranteeLetterCostModal
	} = useContext(GuaranteeLetterCostContext)

	useEffect(() => getGuaranteeLetterCost_byidContract(params.id), [])

	const TotalGuaranteeLetterCost = sumArray(GuaranteeLetterCosts.map((GuaranteeLetterCost) => GuaranteeLetterCost.IntoMoney))
	console.log("TotalGuaranteeLetterCost===: ", TotalGuaranteeLetterCost)
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
	console.log("TotalMiscExpenseCost===: ", TotalMiscExpenseCost)
	//=== End Get MiscExpenseCosts

	//=== Get data CapitalExpenditureCost chi phi von
	const {
		CapitalExpenditureCostState: { CapitalExpenditureCost, CapitalExpenditureCosts, CapitalExpenditureCostsLoading },
		getCapitalExpenditureCosts_byidContract
	} = useContext(CapitalExpenditureCostContext);

	// Start: Get all CapitalExpenditureCosts
	useEffect(() => getCapitalExpenditureCosts_byidContract(params.id), []);
	const TotalCapitalExpense = sumArray(CapitalExpenditureCosts.map((CapitalExpenditureCost) => CapitalExpenditureCost.CapitalExpense))//ch
	console.log("TotalCapitalExpense===: ", TotalCapitalExpense)
	//=== End Get data CapitalExpenditureCost

	//=== Get data AuxiliaryCost
	const {
		AuxiliaryCostState: { AuxiliaryCosts },
		getAuxiliaryCosts_byidContract
	} = useContext(AuxiliaryCostContext)
	// Start: Get AuxiliaryCosts by id Contract
	useEffect(() => getAuxiliaryCosts_byidContract(params.id), [])

	// hàm đổi giá trị chi phí % => giá trị tiền tuyệt đối
	function changeCost(Cost, TotalOutputIntoMoney) {
		let returnValue = Cost;
		if (Cost < 1)
			returnValue = Cost * TotalOutputIntoMoney;
		return returnValue
	}

	function SumListCost(Auxiliary, TotalOutputIntoMoney) {
		let kq = 0;
		Auxiliary.map(AuxiliaryCost =>
			AuxiliaryCost.ListCosts.map(ListCost => (
				kq += changeCost(ListCost.Cost, TotalOutputIntoMoney)
			)))

		return kq;
	}
	function FindPlan(Auxiliary) {
		let returnPlan = 0;
		Auxiliary.map(AuxiliaryCost => returnPlan = AuxiliaryCost.Plan
		)
		return returnPlan;
	}

	const TotalCost = SumListCost(AuxiliaryCosts, TotalOutputIntoMoney);

	let CPXL = 0;
	let CPgross = 0;
	const Auxiliary_Plan = FindPlan(AuxiliaryCosts);
	if (Auxiliary_Plan === 1) {
		CPXL = TotalCost / 0.8 * 0.2;
		CPgross = CPXL + TotalCost;

	}
	else {
		CPXL = TotalCost / 0.7 * 0.25;
		CPgross = CPXL + TotalCost;
	}

	console.log("CPgross=== : ", CPgross)
	//=== End Get data AuxiliaryCost

	//=== Get data ImplementationCost
	const {
		ImplementationCostState: { ImplementationCosts },

		//17-3
		getImplementation_Costs_byidContract

	} = useContext(ImplementationCostContext)
	// 17-3
	useEffect(() => getImplementation_Costs_byidContract(params.id), [])
	// Ham tinh tong tat ca giai doan trien khai
	function TotalStageImplementation(ImplementationCosts) {
		let All_Total = 0;
		ImplementationCosts.map((element) => (
			element.StagesImplementation.map((object) => (
				object.Costs.map((Costs) =>
					All_Total += Costs.IntoMoney
				)))))
		return All_Total;
	}
	const ImplementationCost = TotalStageImplementation(ImplementationCosts);
	// 1.1 Chi phí triển khai hợp đồng + Chi phi Bảo hiểm
	const TotalImplementationCost = ImplementationCost + TotalInsurance;
	//=== End Get data ImplementationCost


	//=== Data process
	// 1. chi phi phat sinh khi thuc hien du an
	const ExtraCost = (TotalImplementationCost + TotalCapitalExpense + TotalMandayCost + TotalGuaranteeLetterCost + TotalMiscExpenseCost)
	
	
	// 3.
	const hieuquaduan = (TotalOutputIntoMoney - TotalInputIntoMoney - ExtraCost - CPgross)

	//===
	let body = null
	let stt = 1
	let TT = 1

	return (
		<>
			<Card className='text-left mx-5 my-5' aninmation={false}>
				<Card.Header as='h2'>BẢNG PHÂN TÍCH HIỆU QUẢ HỢP ĐỒNG - DỰ ÁN </Card.Header>
				<Card.Body>
					<Table striped bordered hover size="sm">
						{Contracts.map(Contract => (
							<>
								<thead key={Contract._id} >
									<tr>
										<th>Số hợp đồng/PO: {Contract.ContractID}</th>
									</tr>
									<tr>
										<th>Trung tâm: {Contract.Center} </th>
									</tr>
									<tr>
										<th>Phòng: {Contract.Deparment} </th>
									</tr>
									<tr>
										<th>Khách Hàng: {Contract.CustomerID}</th>
									</tr>
									<tr>
										<th>Ngày: {Contract.Date}</th>
									</tr>
								</thead>
							</>
						))
						}
					</Table>
					<Table responsive="sm" striped bordered hover size="sm" >
						{ProductCosts.map(ProductCost => (
							<>
								<thead className='text-center'>
									<tr key={ProductCost._id}>
										<th rowSpan="2">STT</th>
										<th rowSpan="2" width="15%">Tên hàng</th>
										<th rowSpan="2" width="5%">Số lượng </th>
										<th colSpan="3">Giá vốn hàng bán Giá kho</th>
										<th colSpan="2 ">Doanh số Giá bán</th>
										<th rowSpan="2 " width="8%">Có tính Chi Phí Bảo Hiểm  </th>
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
								<tbody className='text-right'>
									{ProductCost.ListProducts.map(ListProduct => (
										<tr key={ListProduct._id} >
											<td>{stt++}  </td>
											<td>{ListProduct.ProductName}</td>
											<td>{ListProduct.Quantity.toLocaleString()}</td>
											<td>{ListProduct.FOBCost.toLocaleString()}</td>
											<td>{ListProduct.InputPrice.toLocaleString()}</td>
											<td>{ListProduct.InputIntoMoney.toLocaleString()}</td>
											<td>{ListProduct.OutputPrice.toLocaleString()}</td>
											<td>{ListProduct.OutputIntoMoney.toLocaleString()}</td>
											<td>{ListProduct.Insurance}
												<input
													type='checkbox'
													checked={ListProduct.Insurance}
													onChange={(e) => toggleInsurance((e).target.checked)}
												/>
											</td>

										</tr>

									))
									}
									<tr>
										<td colSpan={5} >Tổng</td>
										<td>{Sum_InputIntoMoney(ProductCosts).toLocaleString()}</td>
										<td></td>
										<td>{Sum_OutputIntoMoney(ProductCosts).toLocaleString()}</td>
										<td></td>
									</tr>
									{/* <tr>
										<td colSpan={7} > Incentive (nếu có)</td>
										<td>{ProductCost.Incentive == null ? 0 : ProductCost.Incentive.toLocaleString()}</td>
										<td></td>
									</tr> */}
								</tbody>
							</>
						))}
						<tr>
							<td>1</td>
							<td colSpan={6} >Chi phí phát sinh khi thực hiện Dự Án </td>
							<td className='text-right'>{Math.round(ExtraCost).toLocaleString()}</td>
							<td></td>
						</tr>
						<tr >
							<td>1.1</td>
							<td colSpan={6} >Chi phí triển khai hợp đồng </td>
							<td className='text-right'>{TotalImplementationCost.toLocaleString()}</td>
							<td></td>
						</tr>
						<tr>
							<td colSpan={2} ></td>
							<td colSpan={5} >+ Chi phí bảo hành phần cứng trích cho TT HSC 0.65%</td>
							<td className='text-right'>{TotalInsurance.toLocaleString()}</td>
							<td></td>
						</tr>
						{
							ImplementationCosts.map(
								(element) => {
									let TotalCategory = 0;
									return (
										<>
											<tr >
												<td colSpan="2"></td>
												<td colSpan="5">
												{element.Category}
												</td>
												<td className='text-right'>
													{
													element.StagesImplementation.map((object => {

														let stt = 1;
														let TotalStage = 0;
															object.Costs.map((Costs) => {
																TotalStage += Costs.IntoMoney
																TotalCategory += Costs.IntoMoney
															})
														
														}))
													}
													{TotalCategory.toLocaleString()}
												</td>
												<td></td>
											</tr>

										</>
									)
								})
						}
						{
							CapitalExpenditureCosts.map((CapitalExpenditureCost) => (
								<>
									<tr key={CapitalExpenditureCost._id}>
										<td>1.2</td>
										<td colSpan={6} > Chi phí vốn</td>
										<td className='text-right'>{Math.round(CapitalExpenditureCost.CapitalExpense).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colSpan={2} ></td>
										<td colSpan={5} >+ Số ngày hàng tồn kho</td>
										<td className='text-right'>{Math.round(CapitalExpenditureCost.InventoryDays).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colSpan={2} ></td>
										<td colSpan={5} >+ Số ngày triển khai</td>
										<td className='text-right'>{Math.round(CapitalExpenditureCost.ImplementationDays).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colSpan={2} ></td>
										<td colSpan={5} >+ Số ngày công nợ nhà cung cấp</td>
										<td className='text-right'>{Math.round(CapitalExpenditureCost.BedtDays).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colSpan={2} ></td>
										<td colSpan={5} > + Số ngày thu nợ </td>
										<td className='text-right'>{Math.round(CapitalExpenditureCost.DebtCollectionDays).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colSpan={2} ></td>
										<td colSpan={5} >+ Khách hàng trả trước (đặt cọc)</td>
										<td className='text-right'>{Math.round(CapitalExpenditureCost.Deposits).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colSpan={2} ></td>
										<td colSpan={5} >+ Đặt cọc cho NTP </td>
										<td className='text-right'>{Math.round(CapitalExpenditureCost.DepositsNTP).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
								</>
							))
						}
						< tr >
							<td>1.3</td>
							<td colSpan={6} >Manday thực hiện của kỹ sư HPT tham gia</td>
							<td className='text-right'>{Math.round(TotalMandayCost).toLocaleString()}</td>
							<td></td>
						</tr>
						<tr >
							<td>1.4</td>
							<td colSpan={6} >Chi phí làm thư bảo lãnh (BL dự thầu, BL thực hiện HĐ, BL BH)</td>
							<td className='text-right'>{Math.round(TotalGuaranteeLetterCost).toLocaleString()}</td>
							<td></td>
						</tr>
						<tr >
							<td>1.5</td>
							<td colSpan={6} > Chi phí khác</td>
							<td className='text-right'>{Math.round(TotalMiscExpenseCost).toLocaleString()}</td>
							<td></td>
						</tr>
						<tr>
							<td>2</td>
							<td colSpan={6} >Chi phí mua vật tư phụ (dự kiến) </td>
							<td className='text-right'>{Math.round((CPgross / 10)).toLocaleString()}</td>
							<td></td>
						</tr>
						<tr>
							<td>3</td>
							<td colSpan={6} >Hiệu quả dự án (giá trị tuyệt đối)</td>
							<td className='text-right'>{hieuquaduan === null ? 0 : Math.round(hieuquaduan).toLocaleString()}</td>
							<td></td>
						</tr>
						<tr>
							<td>4</td>
							<td colSpan={6} >Hiệu quả dự án (tỉ lệ trên doanh thu)</td>
							<td className='text-right'>{((hieuquaduan / TotalOutputIntoMoney) * 100).toFixed(2) + "%"}</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Hiệu quả dự án (chưa trừ  Manday của kỹ sư HPT)</td>
							<td className='text-right'>{Math.round((hieuquaduan + TotalMandayCost)).toLocaleString()}</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Hiệu quả dự án (tỉ lệ doanh thu) - chưa trừ  Manday của kỹ sư HPT</td>
							<td className='text-right'>{(((hieuquaduan + TotalMandayCost) / TotalOutputIntoMoney) * 100).toFixed(2) + "%"}</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Incentive :</td>
							<td className='text-right'>{TotalIncentive.toLocaleString()}</td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Hiệu quả dự án (có Incentive):</td>
							<td className='text-right'>{(((hieuquaduan + TotalIncentive + TotalMandayCost) / TotalOutputIntoMoney) * 100).toFixed(2) + "%"}</td>
							<td></td>
						</tr>
						<tr className='text-center'>

							<td colSpan={10}>
								<a href={`/inputform/${params.id}`}>
									<Button>
										Nhập liệu
									</Button>
								</a>
							</td>

						</tr>
					</Table>

				</Card.Body>
			</Card>
		</>

	)
}




