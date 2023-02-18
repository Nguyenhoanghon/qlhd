import { AuxiliaryCostContext } from '../contexts/AuxiliaryCostContext';
import { ProductCostContext } from '../contexts/ProductCostContext';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card'

import Toast from 'react-bootstrap/Toast'
import AddAuxiliaryCostModal from '../components/AuxiliaryCost/AddAuxiliaryCostModal'//Note
import UpdateAuxiliaryCostModal from '../components/AuxiliaryCost/UpdateAuxiliaryCostModal'//Note


import Table from 'react-bootstrap/Table'
//import ActionButtons from '../components/posts/ActionButtons'
import ActionButtons_AuxiliaryCost from '../components/AuxiliaryCost/ActionButtons_AuxiliaryCost'

//View all
export const AuxiliaryCost_all = () => {
	// Contexts
	/* const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext) */

	const {
		AuxiliaryCostState: { AuxiliaryCost, AuxiliaryCosts, AuxiliaryCostsLoading },
		getAuxiliaryCosts,
		setShowAddAuxiliaryCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(AuxiliaryCostContext)

	// hàm tính tổng 
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}
	//Định dạng hiển thị số
	function formatCash(str) {
		return str.split('').reverse().reduce((prev, next, index) => {
			return ((index % 3) ? next : (next + ',')) + prev
		})
	}


	// Start: Get all AuxiliaryCosts
	useEffect(() => getAuxiliaryCosts(), [])

	//console.log(AuxiliaryCosts);

	let body = null
	let stt = 1
	if (AuxiliaryCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (AuxiliaryCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>Form 7: Chi phí vật tư phụ</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ DỮ LIỆU</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm!
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddAuxiliaryCostModal.bind(this, true)}
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
					<Card.Header as='h2'>Danh sách Chi phí Vật tư phụ của tất cả hợp đồng </Card.Header>
					<Card.Body>

						<Table striped bordered hover size="sm">
							<thead >
								<tr>
									<th>STT</th>
									<th>Nội dung </th>
									<th>Số Tiền</th>
									<th width='25%'>Ghi chú</th>
									<th width='10%'>Plan</th>
									<th width='10%'>id_contract</th>
									<th>Thao tác</th>
								</tr>
							</thead>
							<tbody>
								{AuxiliaryCosts.map(AuxiliaryCost => (
									<tr key={AuxiliaryCost._id} >
										<td>{stt++}  </td>
										<td>{AuxiliaryCost.Content}</td>
										<td>{AuxiliaryCost.Cost.toLocaleString()}</td>
										<td>{AuxiliaryCost.Note}  </td>
										<td>{AuxiliaryCost.Plan}  </td>
										<td>{AuxiliaryCost.contract}  </td>
										<td>
											<ActionButtons_AuxiliaryCost _id={AuxiliaryCost._id} />
										</td>

									</tr>

								))
								}
							</tbody>
						</Table>
						<Button
							variant='primary'
							onClick={setShowAddAuxiliaryCostModal.bind(this, true)}
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
			<AddAuxiliaryCostModal />
			{AuxiliaryCost !== null && <UpdateAuxiliaryCostModal />}
			{/* After AuxiliaryCost is added, show toast */}
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
//View AuxiliaryCost by idContract
export const AuxiliaryCost_byidContract = () => {
	const params = useParams()
	// Contexts
	/* const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext) */

	const {
		AuxiliaryCostState: { AuxiliaryCost, AuxiliaryCosts, AuxiliaryCostsLoading },
		getAuxiliaryCosts_byidContract,
		setShowAddAuxiliaryCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(AuxiliaryCostContext)
	// Start: Get ProductCosts by id Contract
	useEffect(() => getAuxiliaryCosts_byidContract(params.id), [])

	// hàm tính tổng 
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}
	//=== Get productcosts with idcontract
	const {
		ProductCostState: { ProductCosts },
		getProductCost_byidContract
	} = useContext(ProductCostContext)

	// Start: Get ProductCosts by id Contract
	useEffect(() => getProductCost_byidContract(params.id), [])
	const TotalInputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.InputIntoMoney))//note
	const TotalOutputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney))//note
	const TotalIncentive = sumArray(ProductCosts.map((ProductCost) => ProductCost.Incentive))//note

	//=== End Get productcosts with idcontract
	let body = null
	let stt = 1
	console.log("Plan 1", AuxiliaryCosts)

	if (AuxiliaryCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (AuxiliaryCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>Danh sách Chi phí Vật tư phụ</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ DỮ LIỆU</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm!
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddAuxiliaryCostModal.bind(this, true)}
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
					<Card.Header as='h2'>Danh sách Chi phí Vật tư phụ</Card.Header>
					<Card.Body>

						<Table striped bordered hover size="sm">
							<thead >
								<tr>
									<th>STT</th>
									<th>Nội dung </th>
									<th>Số Tiền</th>
									<th width='25%'>Ghi chú</th>
									<th width='10%'>Phương án</th>
									<th>
										<Button
											variant='primary'
											onClick={setShowAddAuxiliaryCostModal.bind(this, true)}
										>
											Thêm mới
										</Button>
									</th>
								</tr>
							</thead>
							<tbody>
								{AuxiliaryCosts.map(AuxiliaryCost => (
									<tr key={AuxiliaryCost._id} >
										<td>{stt++}  </td>
										<td>{AuxiliaryCost.Content}</td>
										<td>{AuxiliaryCost.Cost.toLocaleString()}</td>
										<td>{AuxiliaryCost.Note}  </td>
										<td>{AuxiliaryCost.Plan}  </td>
										<td>
											<ActionButtons_AuxiliaryCost _id={AuxiliaryCost._id} />

										</td>

									</tr>

								))
								}
							</tbody>
						</Table>
						<a href={`/AuxiliaryCost/contract/${params.id}/plan`}>
							<Button
								variant='primary'
							>
								Kết thúc
							</Button>
						</a>
					</Card.Body>
				</Card>

			</>
		)
	}

	return (
		<>
			{body}
			<AddAuxiliaryCostModal />
			<UpdateAuxiliaryCostModal />
			{/* {AuxiliaryCost !== null && <UpdateAuxiliaryCostModal />} */}
			{/* After AuxiliaryCost is added, show toast */}
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

//View AuxiliaryCost by idContract Plan 1 Plan 2
export const AuxiliaryCost_Plan = () => {
	const params = useParams()
	// Contexts
	/* const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext) */

	const {
		AuxiliaryCostState: { AuxiliaryCost, AuxiliaryCosts, AuxiliaryCostsPlan1, AuxiliaryCostsPlan2, AuxiliaryCostsLoading },
		getAuxiliaryCosts_byidContract_Plan1,
		getAuxiliaryCosts_byidContract_Plan2,
		showToast: { show, message, type },
		setShowToast
	} = useContext(AuxiliaryCostContext)

	//if Cost < 1 = Cost* tong doanh thu
	function changeCost(value, heso) {
		let kq = value;
		if (value < 1)
			kq = value * heso;
		return kq
	}
	// hàm tính tổng mang
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}
	//Ham tinh tong phuong an
	function sumTotal(mang, heso) {
		let sum = 0;
		mang.map(function (value) {
			sum += changeCost(value, heso);
		});
		return sum;
	}

	//=== Get productcosts with idcontract
	const {
		ProductCostState: { ProductCost, ProductCosts },
		getProductCost_byidContract
	} = useContext(ProductCostContext)

	// Start: Get ProductCosts by id Contract
	useEffect(() => getProductCost_byidContract(params.id), [])
	//const TotalInputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.InputIntoMoney))//note
	const TotalOutputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney))//note
	//const TotalIncentive = sumArray(ProductCosts.map((ProductCost) => ProductCost.Incentive))//note

	//=== End Get productcosts with idcontract

	console.log("params.id", params.id)

	//get data AuxiliaryCostsPlan1 with idContract and Plan 1
	useEffect(() => getAuxiliaryCosts_byidContract_Plan1(params.id, false), [])
	// Total Plan1
	const TotalPlan1 = sumTotal(AuxiliaryCostsPlan1.map((AuxiliaryCost) => AuxiliaryCost.Cost), TotalOutputIntoMoney)
	const TotalCPXLPlan1 = TotalPlan1 / 0.8 * 0.2
	const TotalCPgrossPlan1 = TotalPlan1 + TotalCPXLPlan1

	//get data AuxiliaryCosts with idContract and Plan 2
	useEffect(() => getAuxiliaryCosts_byidContract_Plan2(params.id, true), [])
	// Total Plan2
	const TotalPlan2 = sumTotal(AuxiliaryCostsPlan2.map((AuxiliaryCost) => AuxiliaryCost.Cost), TotalOutputIntoMoney)
	const TotalCPXLPlan2 = TotalPlan1 / 0.75 * 0.25
	const TotalCPgrossPlan2 = TotalPlan2 + TotalCPXLPlan2

	let body = null
	let stt = 1
	let TT = 1
	console.log("Plan 1", AuxiliaryCosts)

	if (AuxiliaryCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (AuxiliaryCostsPlan1.length === 0 && AuxiliaryCostsPlan2.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>Form 7: Chi phí vật tư phụ</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ DỮ LIỆU</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm!
						</Card.Text>
						<a href={`/AuxiliaryCost/contract/${params.id}`}>
							<Button
								variant='primary'
							>
								Thêm
							</Button>
						</a>
					</Card.Body>
				</Card>
			</>
		)
	} else {

		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>Form 7: Chi phí Vật tư phụ</Card.Header>
					<Card.Body>

						<Table striped bordered hover size="sm">
							<thead >
								<tr>
									<th colSpan={2}>Doanh thu : {TotalOutputIntoMoney.toLocaleString()}  </th>
									<th colSpan={5} align='left'> </th>
								</tr>
								<tr>
									<th colSpan={2}> Phương án 1: chi phí 20%</th>
									<th colSpan={5} align='left'> </th>
								</tr>
							</thead>
							<thead >
								<tr>
									<th>STT</th>
									<th>Nội dung </th>
									<th>Số Tiền</th>
									<th width='25%'>Ghi chú</th>

								</tr>
							</thead>
							{AuxiliaryCostsPlan1.map(AuxiliaryCosts => (
								<tr key={AuxiliaryCosts._id} >
									<td>{stt++}  </td>
									<td>{AuxiliaryCosts.Content}</td>
									<td>{changeCost(AuxiliaryCosts.Cost, TotalOutputIntoMoney).toLocaleString()}</td>
									<td>{AuxiliaryCosts.Note}  </td>
									{/* <td>
										<ActionButtons_AuxiliaryCost _id={AuxiliaryCosts._id} />

									</td> */}
								</tr>

							))
							}
							<tr>
								<td colSpan={2} >Tổng</td>
								<td>{TotalPlan1.toLocaleString()}</td>
								<td></td>
							</tr>
							<tr>
								<td colSpan={2} >CPXL</td>
								<td>{TotalCPXLPlan1.toLocaleString()}</td>
								<td></td>

							</tr>
							<tr>
								<td colSpan={2} >CPgross</td>
								<td>{TotalCPgrossPlan1.toLocaleString()}</td>
								<td></td>
							</tr>
							<thead >
								<tr>
									<th colSpan={2}> Phương án 2: chi phí 25%</th>
									<th colSpan={5} align='left'> </th>
								</tr>
							</thead>
							<thead >
								<tr>
									<th>STT</th>
									<th>Nội dung </th>
									<th>Số Tiền</th>
									<th width='25%'>Ghi chú</th>
								</tr>
							</thead>
							{AuxiliaryCostsPlan2.map(AuxiliaryCosts => (
								<tr key={AuxiliaryCosts._id} >
									<td>{TT++}  </td>
									<td>{AuxiliaryCosts.Content}</td>
									<td>{changeCost(AuxiliaryCosts.Cost, TotalOutputIntoMoney).toLocaleString()}
									</td>
									<td>{AuxiliaryCosts.Note}  </td>
									{/* <td>
										<ActionButtons_AuxiliaryCost _id={AuxiliaryCosts._id} />

									</td> */}
								</tr>

							))
							}
							<tr>
								<td colSpan={2} >Tổng</td>
								<td>{TotalPlan2.toLocaleString()}</td>
								<td></td>


							</tr>
							<tr>
								<td colSpan={2} >CPXL</td>
								<td>{TotalCPXLPlan2.toLocaleString()}</td>
								<td></td>

							</tr>
							<tr>
								<td colSpan={2} >CPgross</td>
								<td>{TotalCPgrossPlan2.toLocaleString()}</td>
								<td></td>
							</tr>
						</Table>
						<a href={`/AuxiliaryCost/contract/${params.id}`}>
							<Button
								variant='primary'
							>
								Thêm
							</Button>
						</a>
						<span>  </span>
						<a href={`/inputform/${params.id}`}>
							<Button
								variant='primary'
							>
								Kết thúc
							</Button>
						</a>
					</Card.Body>
				</Card>

			</>
		)
	}

	return (
		<>
			{body}
			<AddAuxiliaryCostModal />
			<UpdateAuxiliaryCostModal />
			{/* {AuxiliaryCost !== null && <UpdateAuxiliaryCostModal />} */}
			{/* After AuxiliaryCost is added, show toast */}
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
