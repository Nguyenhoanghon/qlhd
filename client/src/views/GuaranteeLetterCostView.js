import { GuaranteeLetterCostContext } from '../contexts/GuaranteeLetterCostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'

import AddGuaranteeLetterCostModal from '../components/GuaranteeLetterCostComponent/AddGuaranteeLetterCostModal'//Note
import UpdateGuaranteeLetterCostModal from '../components/GuaranteeLetterCostComponent/UpdateGuaranteeLetterCostModal'//Note
import addIcon from '../assets/plus_circle_fill.svg'
import Table from 'react-bootstrap/Table'
import ActionButtons_GuaranteeLetterCost from '../components/GuaranteeLetterCostComponent/ActionButtons_GuaranteeLetterCost'

//View all
export const GuaranteeLetterCost_all = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		GuaranteeLetterCostState: { GuaranteeLetterCost, GuaranteeLetterCosts, GuaranteeLetterCostsLoading },
		getGuaranteeLetterCosts,
		setShowAddGuaranteeLetterCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(GuaranteeLetterCostContext)


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

	// Start: Get all GuaranteeLetterCosts
	useEffect(() => getGuaranteeLetterCosts(), [])

	let body = null
	let stt = 1
	const tong = sumArray(GuaranteeLetterCosts.map((GuaranteeLetterCost) => GuaranteeLetterCost.IntoMoney))//note
	if (GuaranteeLetterCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (GuaranteeLetterCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h5'>Form 5: Chi phí làm thư bảo lãnh</Card.Header>
					<Card.Body>
						<Card.Title>Chưa có dữ liệu !</Card.Title>
						{/* <Button
							variant='primary'
							onClick={setShowAddGuaranteeLetterCostModal.bind(this, true)}
						>
							Thêm!
						</Button> */}
					</Card.Body>
				</Card>
			</>
		)
	} else {

		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h5'>Form 5: Chi phí làm thư bảo lãnh</Card.Header>
					<Card.Body>
						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>STT</th>
									<th>Nội dung </th>
									<th>Giá trị thư bảo lãnh</th>
									<th>Số tháng bảo lãnh</th>
									<th>Tỉ lệ phí</th>
									<th>Thành tiền</th>
									<th width='15%'>Ghi chú</th>
								</tr>
							</thead>
							<tbody>
								{GuaranteeLetterCosts.map(GuaranteeLetterCost => (
									<tr key={GuaranteeLetterCost._id} >
										<td>{stt++}  </td>
										<td>{GuaranteeLetterCost.Content}</td>
										<td>{GuaranteeLetterCost.Cost.toLocaleString()}</td>
										<td>{GuaranteeLetterCost.QuantityMonths}</td>
										<td>{GuaranteeLetterCost.RatioCost}</td>
										<td>{GuaranteeLetterCost.IntoMoney.toLocaleString()}</td>
										<td>{GuaranteeLetterCost.Note}  </td>
										<td>
											<ActionButtons_GuaranteeLetterCost _id={GuaranteeLetterCost._id} />
										</td>

									</tr>

								))
								}
								{/* <tr>
									<td colSpan={5} >Tổng</td>
									<td>{tong.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr> */}
							</tbody>
						</Table>
						{/* <Button
							variant='primary'
							onClick={setShowAddGuaranteeLetterCostModal.bind(this, true)}
						>
							Thêm mới
						</Button> */}
					</Card.Body>
				</Card>
			</>
		)
	}

	return (
		<>
			{body}
			<AddGuaranteeLetterCostModal />
			{GuaranteeLetterCost !== null && <UpdateGuaranteeLetterCostModal />}
			{/* After GuaranteeLetterCost is added, show toast */}
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

//View GuaranteeLetterCost by idContract
export const GuaranteeLetterCost_idContract = () => {
	const params = useParams();
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		GuaranteeLetterCostState: { GuaranteeLetterCost, GuaranteeLetterCosts, GuaranteeLetterCostsLoading },
		getGuaranteeLetterCost_byidContract,
		setShowAddGuaranteeLetterCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(GuaranteeLetterCostContext)


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

	// Start: Get all GuaranteeLetterCosts
	useEffect(() => getGuaranteeLetterCost_byidContract(params.id), [])

	let body = null
	let stt = 1
	const tong = sumArray(GuaranteeLetterCosts.map((GuaranteeLetterCost) => GuaranteeLetterCost.IntoMoney))//note
	if (GuaranteeLetterCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (GuaranteeLetterCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h5'>Form 5: Chi phí làm thư bảo lãnh</Card.Header>
					<Card.Body>
						<Card.Title>Chưa có dữ liệu vui lòng click Thêm!</Card.Title>
						<Button
							variant='primary'
							onClick={setShowAddGuaranteeLetterCostModal.bind(this, true)}
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
					<Card.Header as='h5'>Form 5: Chi phí làm thư bảo lãnh</Card.Header>
					<Card.Body>
						<Table striped bordered hover size="sm">
							<thead>
								<tr>
									<th>STT</th>
									<th>Nội dung </th>
									<th>Giá trị thư bảo lãnh</th>
									<th>Số tháng bảo lãnh</th>
									<th>Tỉ lệ phí</th>
									<th>Thành tiền</th>
									<th width='15%'>Ghi chú</th>
								</tr>
							</thead>
							<tbody>
								{GuaranteeLetterCosts.map(GuaranteeLetterCost => (
									<tr key={GuaranteeLetterCost._id} >
										<td>{stt++}  </td>
										<td>{GuaranteeLetterCost.Content}</td>
										<td>{GuaranteeLetterCost.Cost.toLocaleString()}</td>
										<td>{GuaranteeLetterCost.QuantityMonths}</td>
										<td>{GuaranteeLetterCost.RatioCost}</td>
										<td>{GuaranteeLetterCost.IntoMoney.toLocaleString()}</td>
										<td>{GuaranteeLetterCost.Note}  </td>
										<td>
											<ActionButtons_GuaranteeLetterCost _id={GuaranteeLetterCost._id} />
										</td>

									</tr>

								))
								}
								<tr>
									<td colSpan={5} >Tổng</td>
									<td>{tong.toLocaleString()}</td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={8} >
										<Button
											variant='primary'
											onClick={setShowAddGuaranteeLetterCostModal.bind(this, true)}
										>
											Thêm mới
										</Button>
									</td>
								</tr>
							</tbody>
						</Table>
						<a href={`/summary/${params.id}`}>
							<Button
								variant='primary'
							>
								Xem PTHD
							</Button>
						</a>
						<span> </span>
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
			<AddGuaranteeLetterCostModal />
			{GuaranteeLetterCost !== null && <UpdateGuaranteeLetterCostModal />}
			{/* After GuaranteeLetterCost is added, show toast */}
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