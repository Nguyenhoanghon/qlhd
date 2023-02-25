import { AuxiliaryCostContext } from '../contexts/AuxiliaryCostContext';
import { ProductCostContext } from '../contexts/ProductCostContext';
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import Card from 'react-bootstrap/Card'

import Toast from 'react-bootstrap/Toast'
import Create_AuxiliaryCost_Modal from '../components/AuxiliaryCost/Create_AuxiliaryCost_Modal'//Note
import Add_AuxiliaryCost_Cost_Modal from '../components/AuxiliaryCost/Add_AuxiliaryCost_Cost_Modal'
import Update_AuxiliaryCost_Cost_Modal from '../components/AuxiliaryCost/Update_AuxiliaryCost_Cost_Modal'//Note


import Table from 'react-bootstrap/Table'
//import ActionButtons from '../components/posts/ActionButtons'
import ActionButtons_AuxiliaryCost from '../components/AuxiliaryCost/ActionButtons_AuxiliaryCost'

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
		AuxiliaryCostState: { AuxiliaryCosts, AuxiliaryCostsLoading },
		getAuxiliaryCosts_byidContract,
		setshowcreate_AuxiliaryCost_Modal,
		setshowadd_AuxiliaryCost_Cost_Modal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(AuxiliaryCostContext)
	// Start: Get AuxiliaryCosts by id Contract
	useEffect(() => getAuxiliaryCosts_byidContract(params.id),[])
	console.log("AuxiliaryCosts======>>>>>", AuxiliaryCosts)

	// Start: Get ProductCosts by id Contract ==>> Load doanh thu
	// hàm tính tổng 
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}

	const {
		ProductCostState: { ProductCosts },
		getProductCost_byidContract
	} = useContext(ProductCostContext)
	useEffect(() => getProductCost_byidContract(params.id),[])
	const TotalOutputIntoMoney = sumArray(ProductCosts.map((ProductCost) => ProductCost.OutputIntoMoney))

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

	//=== End Get productcosts with idcontract
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
					<Card.Header as='h2'>Danh sách Chi phí Vật tư phụ</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ DỮ LIỆU</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm!
						</Card.Text>
						<Button
							variant='primary'
							onClick={setshowcreate_AuxiliaryCost_Modal.bind(this, true)}
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
									<th colSpan={2}>Doanh thu : {TotalOutputIntoMoney.toLocaleString()}  </th>
									<th colSpan={5} align='left'> </th>
								</tr>
								<tr>
									<th colSpan={2}> Phương án {AuxiliaryCosts.map(AuxiliaryCost => (AuxiliaryCost.Plan))} </th>
									<th colSpan={5} align='left'> </th>
								</tr>
							</thead>
							<thead >
								<tr>
									<th>STT</th>
									<th>Nội dung </th>
									<th>Số Tiền</th>
									<th width='25%'>Ghi chú</th>
									<th>
										<Button
											variant='primary'
											onClick={setshowadd_AuxiliaryCost_Cost_Modal.bind(this, true)}
										>
											Thêm mới
										</Button>
									</th>
								</tr>
							</thead>
							<tbody>
								{AuxiliaryCosts.map(AuxiliaryCost => (

									AuxiliaryCost.ListCosts.map(ListCost => (
										< tr key={ListCost._id} >
											<td>{stt++}  </td>
											<td>{ListCost.Content}</td>
											<td>{(ListCost.Cost < 1 ? ListCost.Cost * TotalOutputIntoMoney : ListCost.Cost).toLocaleString()}  </td>
											<td>{ListCost.Note}
											idcontract {params.id}  </td>
											<td>
												<ActionButtons_AuxiliaryCost idcontract={params.id} idCost={ListCost._id} Content={ListCost.Content} Cost={ListCost.Cost} Note={ListCost.Note} />
												{ListCost._id}
											</td>

										</tr>
									))
								))}
								<tr>
									<td colSpan={2} >Tổng</td>
									<td>{TotalCost.toLocaleString()}</td>
									<td></td>

									<td></td>
								</tr>
								<tr>
									<td colSpan={2} >CPXL</td>
									<td>{CPXL.toLocaleString()}</td>
									<td></td>
									<td></td>

								</tr>
								<tr>
									<td colSpan={2} >CPgross</td>
									<td>{CPgross.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
							</tbody>

						</Table>
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
			<Create_AuxiliaryCost_Modal />
			<Add_AuxiliaryCost_Cost_Modal />
			<Update_AuxiliaryCost_Cost_Modal/>

			{/* <UpdateAuxiliaryCostModal /> */}
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

//View So HD , CPgross , Plan , Note
//View
export const AuxiliaryCost_Contract = () => {
	const params = useParams()
	// Contexts
	/* const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext) */

	const {
		AuxiliaryCostState: { AuxiliaryCosts, AuxiliaryCostsLoading },
		getAuxiliaryCosts,


		setshowcreate_AuxiliaryCost_Modal,
		setshowadd_AuxiliaryCost_Cost_Modal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(AuxiliaryCostContext)
	// Start: Get AuxiliaryCosts by id Contract
	useEffect(() => getAuxiliaryCosts(),[])
	console.log("AuxiliaryCosts======>>>>>", AuxiliaryCosts)

	// Start: Get ProductCosts by id Contract ==>> Load doanh thu
	// hàm tính tổng 
	function sumArray(mang) {
		let sum = 0;
		mang.map(function (value) {
			sum += value;
		});
		return sum;
	}

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
	function FindRevenue (Auxiliary) {
		let kq = 0;
		Auxiliary.map(AuxiliaryCost => kq=AuxiliaryCost.Revenue
			)

		return kq;
	}
	function FindCPGross(Auxiliary){
		let CPXL = 0;
		let CPgross = 0;
		const phuongan = FindPlan(AuxiliaryCosts);
		let TotalCost = SumListCost(AuxiliaryCosts) * FindRevenue (AuxiliaryCosts);
		if (phuongan === 1) {
			CPXL = TotalCost / 0.8 * 0.2;
			CPgross = CPXL + TotalCost;
			console.log("Phuong an 1========", CPXL)
		}
		else {
			CPXL = TotalCost / 0.7 * 0.25;
			CPgross = CPXL + TotalCost;
		}
		return CPgross
	}

	//=== End Get productcosts with idcontract
	let body = null
	let stt = 1
	if (AuxiliaryCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>Danh sách Chi phí Vật tư phụ</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ DỮ LIỆU</Card.Title>
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
									<th colSpan={2}>Doanh thu : </th>
									<th colSpan={5} align='left'> </th>
								</tr>
								<tr>
									<th colSpan={2}> Phương án {AuxiliaryCosts.map(AuxiliaryCost => (AuxiliaryCost.Plan))} </th>
									<th colSpan={5} align='left'> </th>
								</tr>
							</thead>
							<thead >
								<tr>
									<th>STT</th>
									<th>contract ID HOP DONG</th>
									<th>contract ID Chi Phi</th>
									<th>Revenue Doanh thu</th>
									<th>Phuong an chi</th>
									<th width='25%'>CPgross</th>
								</tr>
							</thead>
							<tbody>
								{AuxiliaryCosts.map(AuxiliaryCost => (
										
										< tr key={AuxiliaryCost._id} >
											<td>{stt++}</td>
											<td>{AuxiliaryCost.contract}</td>
											<td>{AuxiliaryCost._id}</td>
											<td>{AuxiliaryCost.Renevue}</td>
											<td>{AuxiliaryCost.Plan}</td>
											<td>{}</td>

										</tr>
									
								))}
								
							</tbody>

						</Table>
					</Card.Body>
				</Card>

			</>
		)
	}

	return (
		<>
			{body}
			{/* <Create_AuxiliaryCost_Modal />
			<Add_AuxiliaryCost_Cost_Modal />
			<Update_AuxiliaryCost_Cost_Modal/> */}

			{/* <UpdateAuxiliaryCostModal /> */}
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