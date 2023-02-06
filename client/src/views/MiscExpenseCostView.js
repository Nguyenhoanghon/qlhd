import { MiscExpenseCostContext } from '../contexts/MiscExpenseContext'
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

import AddMiscExpenseCostModal from '../components/MiscExpenseCost/AddMiscExpenseCostModal'//Note
import UpdateMiscExpenseCostModal from '../components/MiscExpenseCost/UpdateMiscExpenseCostModal'//Note

import addIcon from '../assets/plus-circle-fill.svg'
import Table from 'react-bootstrap/Table'
//import ActionButtons from '../components/posts/ActionButtons'
import ActionButtons_MiscExpenseCost from '../components/MiscExpenseCost/ActionButtons_MiscExpenseCost'
//View all MiscExpenseCost
export const MiscExpenseCost_all = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		MiscExpenseCostState: { MiscExpenseCost, MiscExpenseCosts, MiscExpenseCostsLoading },
		getMiscExpenseCosts,
		setShowAddMiscExpenseCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(MiscExpenseCostContext)

	// hàm tính tổng 
	function sumArray(mang){
    let sum = 0;
    mang.map(function(value){
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

	// Start: Get all MiscExpenseCosts
	useEffect(() => getMiscExpenseCosts(), [])

	//console.log(MiscExpenseCosts);

	let body = null
	let stt = 1
	const TotalMiscExpenseCost =  sumArray(MiscExpenseCosts.map((MiscExpenseCost) => MiscExpenseCost.Cost))
	if (MiscExpenseCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (MiscExpenseCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>Form 6: Chi phí khác</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ DỮ LIỆU CHI PHÍ KHÁC</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm! để mới
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddMiscExpenseCostModal.bind(this, true)}
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
					<Card.Header as='h2'>Form 6: Chi phí khác</Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead >
								<tr>
								<th>STT</th>
								<th>Nội dung </th>
								<th>Số Tiền</th>
								<th width='25%'>Ghi chú</th>
								</tr>
							</thead>
							<tbody>
								{MiscExpenseCosts.map(MiscExpenseCost => ( 
								<tr key={MiscExpenseCost._id} >
									<td>{stt++}  </td>
									<td>{MiscExpenseCost.Content}</td>
									<td>{MiscExpenseCost.Cost.toLocaleString()}</td>
									<td>{MiscExpenseCost.Note}  </td>
									<td>
									<ActionButtons_MiscExpenseCost _id={MiscExpenseCost._id} />
									</td>
								
								</tr>
								
								))
								}
								<tr>
									<td colSpan={2} >Tổng</td>
									<td>{TotalMiscExpenseCost.toLocaleString()}</td>
									<td></td>
									<td></td>
									
								</tr>
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddMiscExpenseCostModal.bind(this, true)}
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
			<AddMiscExpenseCostModal />
			{MiscExpenseCost !== null && <UpdateMiscExpenseCostModal />}
			{/* After MiscExpenseCost is added, show toast */}
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

//View MiscExpenseCost by idContract
export const MiscExpenseCost_byidContract = () => {
	const params = useParams()
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		MiscExpenseCostState: { MiscExpenseCost, MiscExpenseCosts, MiscExpenseCostsLoading },
		getMiscExpenseCost_byidContract,
		setShowAddMiscExpenseCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(MiscExpenseCostContext)

	// hàm tính tổng 
	function sumArray(mang){
    let sum = 0;
    mang.map(function(value){
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

	// Start: Get all MiscExpenseCosts
	useEffect(() => getMiscExpenseCost_byidContract(params.id), [])

	//console.log(MiscExpenseCosts);

	let body = null
	let stt = 1
	const TotalMiscExpenseCost =  sumArray(MiscExpenseCosts.map((MiscExpenseCost) => MiscExpenseCost.Cost))
	if (MiscExpenseCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (MiscExpenseCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h2'>Form 6: Chi phí khác</Card.Header>
					<Card.Body>
						<Card.Title>CHƯA CÓ DỮ LIỆU CHI PHÍ KHÁC</Card.Title>
						<Card.Text>
							Vui lòng bấm thêm! để mới
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddMiscExpenseCostModal.bind(this, true)}
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
				<Card className='text-center mx-5 my-5' animation={false}>
					<Card.Header as='h2'>Form 6: Chi phí khác</Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead >
								<tr>
								<th>STT</th>
								<th>Nội dung </th>
								<th>Số Tiền</th>
								<th width='25%'>Ghi chú</th>
								</tr>
							</thead>
							<tbody>
								{MiscExpenseCosts.map(MiscExpenseCost => ( 
								<tr key={MiscExpenseCost._id} >
									<td>{stt++}  </td>
									<td>{MiscExpenseCost.Content}</td>
									<td>{MiscExpenseCost.Cost.toLocaleString()}</td>
									<td>{MiscExpenseCost.Note}  </td>
									<td>
									<ActionButtons_MiscExpenseCost _id={MiscExpenseCost._id} />
									</td>
								
								</tr>
								
								))
								}
								<tr>
									<td colSpan={2} >Tổng</td>
									<td>{TotalMiscExpenseCost.toLocaleString()}</td>
									<td></td>
									<td></td>
									
								</tr>
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddMiscExpenseCostModal.bind(this, true)}
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
			<AddMiscExpenseCostModal />
			{MiscExpenseCost !== null && <UpdateMiscExpenseCostModal />}
			{/* After MiscExpenseCost is added, show toast */}
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

