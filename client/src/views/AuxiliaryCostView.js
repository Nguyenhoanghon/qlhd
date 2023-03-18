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
//Execute: running
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
		setShowToast,
		showToast
	} = useContext(AuxiliaryCostContext)
	// Start: Get AuxiliaryCosts by id Contract
	useEffect(() => getAuxiliaryCosts_byidContract(params.id))//,[showToast])
	console.log("AuxiliaryCosts======>>>>>", AuxiliaryCosts)

	// Start: Get ProductCosts by id Contract ==>> Load doanh thu
	function changeCost(value, heso) {
		let kq = value;
		if (value < 1)
			kq = value * heso;
		return kq
	}

	//Hàm tính tổng mang có chuyển giá trị %
	function sumTotal(mang, heso) {
		let sum = 0;
		mang.map(function (value) {
			sum += changeCost(value, heso);
		});
		return sum;
	}

	//Ham tinh tong Phan tử trong kieu mang
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
		Auxiliary.map(AuxiliaryCost => kq = AuxiliaryCost.Plan
		)

		return kq;
	}
	function FindRevenue(Auxiliary) {
		let kq = 0;
		Auxiliary.map(AuxiliaryCost => kq = AuxiliaryCost.Revenue
		)

		return kq;
	}
	//Execute: Not run
	function FindCPGross(Auxiliary) {
		let CPXL = 0;
		let CPgross = 0;
		const phuongan = FindPlan(AuxiliaryCosts);
		let TotalCost = SumListCost(AuxiliaryCosts) * FindRevenue(AuxiliaryCosts);
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
	//Execute: Running
	function Find_CPXL(Totalcost, plan) {
		let CPXL = 0;
		if (plan === 1) {
			CPXL = Totalcost / 0.8 * 0.2;
		}
		else {
			CPXL = Totalcost / 0.7 * 0.25;
		}
		return CPXL
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
					<Card.Header as='h2'>Form7: Chi phí Vật tư phụ</Card.Header>
					<Card.Body>

						<Table striped bordered hover size="sm">
							{AuxiliaryCosts.map(AuxiliaryCost => (
								<>
									<thead >
										<tr>
											<th colSpan={5} align={'left'}>Doanh thu : {AuxiliaryCost.Renevue.toLocaleString()} </th>
										</tr>
										<tr>
											<th colSpan={5} align={'left'}> Phương án :{AuxiliaryCost.Plan} </th>
										</tr>
									</thead>
									<thead >
										<tr>
											<th>STT</th>
											<th>Nội dung </th>
											<th>Số Tiền</th>
											<th width='25%'>Ghi chú</th>
											<th> Thao tác</th>
										</tr>
									</thead>
									<tbody>{AuxiliaryCost.ListCosts.map(ListCost => (
										<>
											<tr>
												<td>{stt++}</td>
												<td>{ListCost.Content}</td>
												<td>{changeCost(ListCost.Cost, AuxiliaryCost.Renevue).toLocaleString()}</td>
												<td>{ListCost.Note}</td>
												<td><ActionButtons_AuxiliaryCost idcontract={params.id} idCost={ListCost._id} Content={ListCost.Content} Cost={ListCost.Cost} Note={ListCost.Note} />
													</td>
											</tr>
										</>
									))}
									</tbody>
									<tr>
										<td colSpan={4}> </td>
										<td >
											<Button
												variant='primary'
												onClick={setshowadd_AuxiliaryCost_Cost_Modal.bind(this, true)}
											>
												Thêm chi phí
											</Button>
										</td>
									</tr>
									<tr>
										<td colSpan={2}> Tổng chi phí</td>
										<td>{sumTotal(AuxiliaryCost.ListCosts.map(ListCost => (ListCost.Cost)), AuxiliaryCost.Renevue).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colSpan={2}> CPXL</td>
										<td>{Find_CPXL(sumTotal(AuxiliaryCost.ListCosts.map(ListCost => (ListCost.Cost)), AuxiliaryCost.Renevue), AuxiliaryCost.Plan).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>
									<tr>
										<td colSpan={2}> CPgross</td>
										<td>{((sumTotal(AuxiliaryCost.ListCosts.map(ListCost => (ListCost.Cost)), AuxiliaryCost.Renevue) + Find_CPXL(sumTotal(AuxiliaryCost.ListCosts.map(ListCost => (ListCost.Cost)), AuxiliaryCost.Renevue), AuxiliaryCost.Plan))/10).toLocaleString()}</td>
										<td></td>
										<td></td>
									</tr>

								</>
							))}
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
			<Update_AuxiliaryCost_Cost_Modal />

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
		AuxiliaryCostState: { AuxiliaryCosts, Contracts, AuxiliaryCostsLoading },
		getAuxiliaryCosts,
		getContract_All
	} = useContext(AuxiliaryCostContext)
	useEffect(() => getAuxiliaryCosts(), [])
	console.log("AuxiliaryCosts======>>>>>", AuxiliaryCosts)
	// hàm đổi giá trị chi phí % => giá trị tiền tuyệt đối
	function changeCost(value, revenue) {
		let kq = value;
		if (value < 1)
			kq = value * revenue;
		return kq
	}
	//Ham tinh tong phuong an Có chuyển đổi giá trị < 1
	function sumTotal(mang, heso) {
		let sum = 0;
		mang.map(function (value) {
			sum += changeCost(value, heso);
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
		Auxiliary.map(AuxiliaryCost => kq = AuxiliaryCost.Plan
		)

		return kq;
	}
	//Hàm trả về phần tử 
	function FindRevenue(Auxiliary) {
		let kq = 0;
		Auxiliary.map(AuxiliaryCost => kq = AuxiliaryCost.Revenue
		)

		return kq;
	}
	
	//Execute: Running
	function Find_CPXL(Totalcost, plan) {
		let CPXL = 0;
		if (plan === 1) {
			CPXL = Totalcost / 0.8 * 0.2;
		}
		else {
			CPXL = Totalcost / 0.7 * 0.25;
		}
		return CPXL
	}
	//Execute: Not use
	function FindCPGross(Auxiliary) {
		let CPXL = 0;
		let CPgross = 0;
		const phuongan = FindPlan(AuxiliaryCosts);
		let TotalCost = SumListCost(AuxiliaryCosts) * FindRevenue(AuxiliaryCosts);
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
									<th>STT</th>
									<th>Số Hợp đồng</th>
									{/* <th>contract ID Chi phí</th> */}
									<th>Doanh thu</th>
									<th>Phương án chi</th>
									<th>Tổng chi phí</th>
									<th width='15%'>CPXL</th>
									<th width='15%'>CPgross</th>
									<th width='20%'> Thao tác </th>
								</tr>
							</thead>
							<tbody>
								{AuxiliaryCosts.map(AuxiliaryCost => (
									< tr key={AuxiliaryCost._id} >
										<td>{stt++}</td>
										<td>{AuxiliaryCost.contract.ContractID}</td>
										{/* <td>{AuxiliaryCost._id}</td> */}
										<td>{AuxiliaryCost.Renevue.toLocaleString()}</td>
										<td>{AuxiliaryCost.Plan}</td>
										<td>{sumTotal(AuxiliaryCost.ListCosts.map(ListCost => (ListCost.Cost)), AuxiliaryCost.Renevue).toLocaleString()}</td>
										<td>{Math.round(Find_CPXL(sumTotal(AuxiliaryCost.ListCosts.map(ListCost => (ListCost.Cost)), AuxiliaryCost.Renevue), AuxiliaryCost.Renevue)).toLocaleString()}</td>
										<td>{Math.round(((sumTotal(AuxiliaryCost.ListCosts.map(ListCost => (ListCost.Cost)), AuxiliaryCost.Renevue) + Find_CPXL(sumTotal(AuxiliaryCost.ListCosts.map(ListCost => (ListCost.Cost)), AuxiliaryCost.Renevue), AuxiliaryCost.Renevue)) / 10)).toLocaleString()}</td>
										<th width='25%'><a href={`/AuxiliaryCost/contract/${AuxiliaryCost.contract._id}`}>
											<Button
												variant='primary'
											>
												Xem chi tiết
											</Button>
										</a></th>
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
		</>
	)
}