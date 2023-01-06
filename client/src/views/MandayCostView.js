import { MandayCostContext } from '../contexts/MandayCostContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
/* import { useState } from 'react' */
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' */
import addIcon from '../assets/plus-circle-fill.svg'

import AddMandayCostModal from '../components/Mandaykysu/AddMandayCostModal'//Note
import UpdateMandayCostModal from '../components/Mandaykysu/UpdateMandayCostModal'//Note
import ActionButtons_MandayCost from '../components/Mandaykysu/ActionButtons_MandayCost'


import Table from 'react-bootstrap/Table'

const MandayCost = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		MandayCostState: { MandayCost, MandayCosts, MandayCostsLoading },
		getMandayCosts,
		setShowAddMandayCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(MandayCostContext)

	// hàm tính tổng thành tiền
	function sumArray(mang){
    let sum = 0;
    mang.map(function(value){
        sum += value;
    });
    return sum;
	}

	// Start: Get all MandayCosts
	useEffect(() => getMandayCosts(), [])

	let body = null
	let stt = 1
	const tong =  sumArray(MandayCosts.map((MandayCost) => MandayCost.thanhtien))//note
	if (MandayCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (MandayCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>Hi {username}</Card.Header>
					<Card.Body>
						<Card.Title>Welcome Manday kỹ sư</Card.Title>
						<Card.Text>
							Chưa có Dữ liệu
						</Card.Text>
						<Button
							variant='primary'
							onClick={setShowAddMandayCostModal.bind(this, true)}
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
					<Card.Header as='h1'>MANDAY KỸ SƯ</Card.Header>
					<Card.Body>
						<Table responsive="lg" striped bordered hover size="lg" variant="" >
							<thead>
								<tr>
								<th>STT</th>
								<th>Phòng ban </th>
								<th>Manday chuẩn</th>
								<th  width='10%'>Số người tham gia dự án</th>
								<th width='10%'>Số ngày thực hiện dự án</th>
								<th>Thành tiền</th>
								<th width='20%'>Ghi chú</th>
								<th width='20%'>ID hợp đồng</th>
								</tr>
							</thead>
							<tbody>
								{MandayCosts.map(MandayCost => ( 
								<tr key={MandayCost._id} >
									<td>{stt++}  </td>
									<td>{MandayCost.Department}</td>
									<td>{MandayCost.Cost}</td>
									<td>{MandayCost.StaffNumber}</td>
									<td>{MandayCost.ImplementationDay}</td>
									<td>{MandayCost.IntoMoney.toLocaleString()}</td>
									<td>{MandayCost.Note}  </td>
									<td>{MandayCost.contract}  </td>
									<td>
									<ActionButtons_MandayCost _id={MandayCost._id} />
									</td>
								
								</tr>
								
								))
								}
								<tr>
									<td colSpan={5} >Tổng</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddMandayCostModal.bind(this, true)}
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
			<AddMandayCostModal />
			{MandayCost !== null && <UpdateMandayCostModal />}
			{/* After MandayCost is added, show toast */}
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

export default MandayCost
