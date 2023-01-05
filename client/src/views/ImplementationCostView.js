import { ImplementationCostContext } from '../contexts/ImplementationCostContext'//Note GET DELETE
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
/* import { useState } from 'react' */
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/

//import AddImplementationCostModal from '../components/chitiethanghoa/AddImplementationCostModal'//Note
//import UpdateImplementationCostModal from '../components/chitiethanghoa/UpdateImplementationCostModal'//Note
//import ActionButtons_ImplementationCost from '../components/chitiethanghoa/ActionButtons_ImplementationCost'


import Table from 'react-bootstrap/Table'

const ImplementationCost = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		ImplementationCostState: { ImplementationCost, ImplementationCosts, ImplementationCostsLoading },
		getImplementationCosts,
		setShowAddImplementationCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ImplementationCostContext)

	// hàm tính tổng thành tiền
	function sumArray(mang){
    let sum = 0;
    mang.map(function(value){
        sum += value;
    });
    return sum;
	}

	// Start: Get all ImplementationCosts
	useEffect(() => getImplementationCosts(), [])
	console.log(ImplementationCosts);
	let body = null
	let stt = 1
	//const tongthanhtiengiakho =  sumArray(ImplementationCosts.map((ImplementationCost) => ImplementationCost.thanhtiengiakho))//note
	//const tongthanhtiengiaban =  sumArray(ImplementationCosts.map((ImplementationCost) => ImplementationCost.thanhtiengiaban))//note
	if (ImplementationCostsLoading) {
		body = (
			<div className='spinner-container'>
				<Spinner animation='border' variant='info' />
			</div>
		)
	} else if (ImplementationCosts.length === 0) {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>CHI TIẾT TRIỂN KHAI</Card.Header>
					<Card.Body>
						<Card.Title>Chưa có dữ liệu</Card.Title>
						<Button
							variant='primary'
							onClick={setShowAddImplementationCostModal.bind(this, true)}
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
					<Card.Header as='h1'>CHI TIẾT TRIỂN KHAI</Card.Header>
					<Card.Body>
						<Table responsive="sm" striped bordered hover size="sm" >
							<thead>
								 <tr>
									<th rowspan="2">TT</th>
									<th rowspan="2" width="15%">Nội dung dự trù</th>
									<th rowspan="2" width="5%">Đơn vị </th>
									<th rowspan="2" width="5%">Đơn giá </th>
									<th colspan="2">Số lượng </th>
									<th rowspan="2" width="5%">Thành tiền </th>
									<th rowspan="2" width="5%">Ghi chú </th>
                   				 </tr>
								<tr>
									<th width='8%' as='pre'> Ngày/Lượt</th>
									<th>Người</th>
								</tr>
							</thead>
							<tr>
								<td colSpan={9} align={'left'}> A. CHI PHÍ CHUNG</td>
							</tr>
							<tbody>
								{ImplementationCosts.map(ImplementationCost => ( 
								<tr key={ImplementationCost._id} >
									<td>{stt++}  </td>
									<td>{ImplementationCost._id}</td>
									<td>{ImplementationCost.contract}</td>
									<td>{ImplementationCost.GeneralExpense[0].Content}</td>
									<td>{ImplementationCost.Quantity_days}</td>
									<td>{ImplementationCost.Quantity_times}</td>
									<td>{ImplementationCost.IntoMoney}</td>
									<td>{ImplementationCost.Note}  </td>
									<td>
									
									</td>
								
								</tr>
								
								))
								}
								<tr>
									<td colSpan={7} >Tổng</td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
    					</Table>
						<Button
							variant='primary'
							onClick={setShowAddImplementationCostModal.bind(this, true)}
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
			{/* After ImplementationCost is added, show toast */}
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

export default ImplementationCost
