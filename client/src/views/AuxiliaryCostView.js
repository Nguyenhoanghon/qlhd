import { AuxiliaryCostContext } from '../contexts/AuxiliaryCostContext'//Note GET DELETE
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

import AddAuxiliaryCostModal from '../components/AuxiliaryCost/AddAuxiliaryCostModal'//Note
import UpdateAuxiliaryCostModal from '../components/AuxiliaryCost/UpdateAuxiliaryCostModal'//Note

import addIcon from '../assets/plus-circle-fill.svg'
import Table from 'react-bootstrap/Table'
//import ActionButtons from '../components/posts/ActionButtons'
import ActionButtons_AuxiliaryCost from '../components/AuxiliaryCost/ActionButtons_AuxiliaryCost'
const AuxiliaryCost = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		AuxiliaryCostState: { AuxiliaryCost, AuxiliaryCosts, AuxiliaryCostsLoading },
		getAuxiliaryCosts,
		setShowAddAuxiliaryCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(AuxiliaryCostContext)

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

	// Start: Get all AuxiliaryCosts
	useEffect(() => getAuxiliaryCosts(), [])

	//console.log(AuxiliaryCosts);

	let body = null
	let stt = 1
	const tong =  sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.Cost))
	const tongCPXL =  sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.CPXL))
	const tongCPgross =  sumArray(AuxiliaryCosts.map((AuxiliaryCost) => AuxiliaryCost.CPgross))
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
					<Card.Header as='h2'>Form 7: Chi phí Vật tư phụ</Card.Header>
					<Card.Body>
						<Table  striped bordered hover size="sm">
							<thead >
								<tr>
								<th>STT</th>
								<th>Doanh thu </th>
								<th>Nội dung </th>
								<th>Số Tiền</th>
								<th width='25%'>Ghi chú</th>
								<th width='10%'>Plan</th>
								<th width='10%'>id_contract</th>
								</tr>
							</thead>
							<tbody>
								{AuxiliaryCosts.map(AuxiliaryCost => ( 
								<tr key={AuxiliaryCost._id} >
									<td>{stt++}  </td>
									<td>{AuxiliaryCost.Renevue}</td>
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
								<tr>
									<td colSpan={3} >Tổng</td>
									<td>{tong.toLocaleString()}</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									
								</tr>
								<tr>
									<td colSpan={3} >CPXL</td>
									<td>{tongCPXL.toLocaleString()}</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr>
									<td colSpan={3} >CPgross</td>
									<td>{tongCPgross.toLocaleString()}</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
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
export default AuxiliaryCost
