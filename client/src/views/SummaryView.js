
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
import { ActionButtons_Add_StageCostDetail } from '../components/implementationCost/ActionButtons_ImplementationCost'



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

	//Ham checkbox Insurance
	const [stateInsurance, setStateInsurance] = useState(false)
	const toggleTheme = (value) => {
		setStateInsurance(value);
	};

	// Start: Get ProductCosts by id Contract
	useEffect(() => getProductCost_byidContract(params.id), [])
	//tính tổng tiền bảo hiểm

	function SumInsurance(mang1, mang2) {
		let sum = 0;
		//console.log("Array Insurace =========",mang1)
		//console.log("Array Insurace =========",mang2)
		mang1.forEach((element, index) => {
			if (mang1[index]) {
				sum += mang2[index];
			}


		});

		return sum;
	}
	const TotalInsurance = 0.0065 * SumInsurance(ProductCosts.map((ProductCost) => ProductCost.Insurance), ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney))
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

	//=== Get data CapitalExpenditureCost chi phi von
	const {
		CapitalExpenditureCostState: { CapitalExpenditureCost, CapitalExpenditureCosts, CapitalExpenditureCostsLoading },
		getCapitalExpenditureCosts_byidContract
	} = useContext(CapitalExpenditureCostContext);

	// Start: Get all CapitalExpenditureCosts
	useEffect(() => getCapitalExpenditureCosts_byidContract(params.id), []);
	const TotalCapitalExpense = sumArray(CapitalExpenditureCosts.map((CapitalExpenditureCost) => CapitalExpenditureCost.CapitalExpense))//ch


	//=== End Get data CapitalExpenditureCost

	//=== Get data AuxiliaryCost
	const {
		AuxiliaryCostState: { AuxiliaryCosts, AuxiliaryCostsLoading },
		getAuxiliaryCosts_byidContract
	} = useContext(AuxiliaryCostContext)
	// Start: Get AuxiliaryCosts by id Contract
	useEffect(() => getAuxiliaryCosts_byidContract(params.id),[])
	console.log("AuxiliaryCosts======>>>>>", AuxiliaryCosts)
	
	function SumListCost(Auxiliary) {
		let kq = 0;
		Auxiliary.map(AuxiliaryCost =>
			AuxiliaryCost.ListCosts.map(ListCost => (
				kq += ListCost.Cost
			)))

		return kq;
	}
	function FindPlan(Auxiliary) {
		let kq = 0;
		Auxiliary.map(AuxiliaryCost => kq=AuxiliaryCost.Plan
			)

		return kq;
	}
	const TotalCost = SumListCost(AuxiliaryCosts) * TotalOutputIntoMoney;
	let CPXL = 0;
	let CPgross = 0;
	const phuongan = FindPlan(AuxiliaryCosts);
	if (phuongan === 1) {
		CPXL = TotalCost / 0.8 * 0.2;
		CPgross = CPXL + TotalCost;
		console.log("Phuong an 1========", CPXL)
	}
	else {
		CPXL = TotalCost / 0.7 * 0.25;
		CPgross = CPXL + TotalCost;
	}


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
	// Ham tinh tong tat ca giai doan trien khai
	function All_TotalStageImplementation(ImplementationCosts) {
		let All_Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.StagesImplementation.forEach((element, index) => {
				All_Total += TotalStageImplementation(index)
			})))
		return All_Total;
	}
	//Function TotalGeneralExpense
	function TotalGeneralExpense(stage) {
		let Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.GeneralExpense[stage].Costs.map(Costs => (
				Total += Costs.IntoMoney))))

		return Total;
	}
	// Ham tinh tong tat ca giai doan trien khai
	function All_TotalGeneralExpense(ImplementationCosts) {
		let All_Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.GeneralExpense.forEach((element, index) => {
				All_Total += TotalGeneralExpense(index)
				//console.log("Tong chi chi phi chung;", All_Total);
			})))

		return All_Total;
	}
	const GeneralExpense = All_TotalGeneralExpense(ImplementationCosts);
	const StageImplementation = All_TotalStageImplementation(ImplementationCosts);
	const TotalImplementationCost = GeneralExpense + StageImplementation;
	//=== End Get data ImplementationCost


	//=== Data process
	// 1. chi phi phat sinh khi thuc hien du an
	const ExtraCost = (TotalInsurance + TotalImplementationCost + TotalCapitalExpense + TotalMandayCost + TotalGuaranteeLetterCost + TotalMiscExpenseCost)

	// 3.
	const hieuquaduan = (TotalOutputIntoMoney - TotalInputIntoMoney - ExtraCost - CPgross)

	//===
	let body = null
	let stt = 1
	let TT = 1

	return (
		<>
			<Card className='text-center mx-5 my-5' aninmation={false}>
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
								<th>{/* Tỷ giá USD */}</th>
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
									<td>{/* {Contract.RatioUSD} */}</td>
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
									<td>{TT++} </td>
									<td>{ProductCost.ProductName}</td>
									<td>{ProductCost.Quantity.toLocaleString()}</td>
									<td>{ProductCost.FOBCost.toLocaleString()}</td>
									<td>{ProductCost.InputPrice.toLocaleString()}</td>
									<td>{ProductCost.InputIntoMoney.toLocaleString()}</td>
									<td>{ProductCost.OutputPrice.toLocaleString()}</td>
									<td>{ProductCost.OutputIntoMoney.toLocaleString()}</td>
									<td>
										{/* {ProductCost.Insurance} Check data*/}
										<input
											type='checkbox'
											checked={ProductCost.Insurance}
											onChange={(e) => toggleTheme(e.target.checked)}
										/>
									</td>
									{/* Checkbox */}
									<td>{ProductCost.Note}  </td>
								</tr>

							))
							}
							<tr>
								<td colSpan={5} >TỔNG CỘNG</td>
								<td>{TotalInputIntoMoney.toLocaleString()}</td>
								<td></td>
								<td>{TotalOutputIntoMoney.toLocaleString()}</td>
								<td></td>
								<td></td>

							</tr>
						</tbody>
						<tr>
							<td>1</td>
							<td colSpan={6} >Chi phí phát sinh khi thực hiện Dự Án </td>
							<td>{ExtraCost.toLocaleString()}</td>
							<td></td>
							<td></td>

						</tr>
						<tr >
							<td>1.1</td>
							<td colSpan={6} >Chi phí triển khai hợp đồng </td>
							<td>{TotalImplementationCost.toLocaleString()}</td>
							<td></td>
							<td></td>

						</tr>
						<tr>
							<td colSpan={2} ></td>
							<td colSpan={5} >+ Chi phí bảo hành phần cứng trích cho TT HSC 0.65%</td>
							<td>{TotalInsurance.toLocaleString()}</td>
							<td></td>
							<td></td>

						</tr>
						<tr>
							<td colSpan={2} ></td>
							<td colSpan={5} >+ Chi phí chung</td>
							<td>{GeneralExpense.toLocaleString()}</td>
							<td></td>
							<td></td>

						</tr>
						<tr>
							<td colSpan={2} ></td>
							<td colSpan={5} >+ Chi phí triển khai</td>
							<td>{StageImplementation.toLocaleString()}</td>
							<td>{ }</td>
							<td></td>
						</tr>
						{CapitalExpenditureCosts.map((CapitalExpenditureCost) => (
							<>
								<tr key={CapitalExpenditureCost._id}>
									<td>1.2</td>
									<td colSpan={6} > Chi phí vốn</td>
									<td>{CapitalExpenditureCost.CapitalExpense.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày hàng tồn kho</td>
									<td>{CapitalExpenditureCost.InventoryDays.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày triển khai</td>
									<td>{CapitalExpenditureCost.ImplementationDays.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Số ngày công nợ nhà cung cấp</td>
									<td>{CapitalExpenditureCost.BedtDays}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} > + Số ngày thu nợ </td>
									<td>{CapitalExpenditureCost.DebtCollectionDays.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Khách hàng trả trước (đặt cọc)</td>
									<td>{CapitalExpenditureCost.Deposits.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={2} ></td>
									<td colSpan={5} >+ Đặt cọc cho NTP </td>
									<td>{CapitalExpenditureCost.DepositsNTP.toLocaleString()}</td>
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
						</tr>
						<tr >
							<td>1.4</td>
							<td colSpan={6} >Chi phí làm thư bảo lãnh (BL dự thầu, BL thực hiện HĐ, BL BH)</td>
							<td>{TotalGuaranteeLetterCost.toLocaleString()}</td>
							<td></td>
							<td></td>
						</tr>
						<tr >
							<td>1.5</td>
							<td colSpan={6} > Chi phí khác</td>
							<td>{TotalMiscExpenseCost.toLocaleString()}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>2</td>
							<td colSpan={6} >Chi phí mua vật tư phụ (dự kiến) </td>
							<td>{(CPgross / 10).toLocaleString()}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>3</td>
							<td colSpan={6} >Hiệu quả dự án (giá trị tuyệt đối)</td>
							<td>{hieuquaduan.toLocaleString()}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td>4</td>
							<td colSpan={6} >Hiệu quả dự án (tỉ lệ trên doanh thu)</td>
							<td>{((hieuquaduan / TotalOutputIntoMoney) * 100).toFixed(2) + "%"}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Hiệu quả dự án (chưa trừ  Manday của kỹ sư HPT)</td>
							<td>{(hieuquaduan + TotalMandayCost).toLocaleString()}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Incentive :</td>
							<td>{TotalIncentive.toLocaleString()}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							<td></td>
							<td colSpan={6} >Hiệu quả dự án (có Incentive):</td>
							<td>{(((hieuquaduan + TotalMandayCost) / TotalOutputIntoMoney) * 100).toFixed(2) + "%"}</td>
							<td></td>
							<td></td>
						</tr>
						<tr>

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




