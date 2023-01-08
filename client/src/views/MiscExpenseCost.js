import { CPKContext } from '../contexts/MiscExpenseContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col'

import AddCPKModal from '../components/chiphikhac/AddCPKModal'//Note
import UpdateCPKModal from '../components/chiphikhac/UpdateCPKModal'//Note

import addIcon from '../assets/plus-circle-fill.svg'
import Table from 'react-bootstrap/Table'
//import ActionButtons from '../components/posts/ActionButtons'
import ActionButtons_CPK from '../components/chiphikhac/ActionButtons_CPK'
const CPK = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		CPKState: { CPK, CPKs, CPKsLoading },
		getCPKs,
		setShowAddCPKModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(CPKContext)

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

	// Start: Get all CPKs
	useEffect(() => getCPKs(), [])

	//console.log(CPKs);

	let body = null
	let stt = 1
	//const tong =  sumArray(CPKs.map((CPK) => CPK.sotien))
	if (CPKsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (CPKs.length === 0) {
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
							onClick={setShowAddCPKModal.bind(this, true)}
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
								{CPKs.map(CPK => ( 
								<tr key={CPK._id} >
									<td>{stt++}  </td>
									<td>{CPK.Content}</td>
									<td>{CPK.Cost.toLocaleString()}</td>
									<td>{CPK.Note}  </td>
									<td>
									<ActionButtons_CPK _id={CPK._id} />
									</td>
								
								</tr>
								
								))
								}
								<tr>
									<td colSpan={2} >Tổng</td>
									<td>{}</td>
									<td></td>
									<td></td>
									
								</tr>
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddCPKModal.bind(this, true)}
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
			<AddCPKModal />
			{CPK !== null && <UpdateCPKModal />}
			{/* After CPK is added, show toast */}
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
export default CPK
