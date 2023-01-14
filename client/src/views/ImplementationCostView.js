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
import ActionButtons_ImplementationCost from '../components/implementationCost/ActionButtons_ImplementationCost'


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

	//tinh tong sai
		const TotalGeneralExpense = 0
		//const TotalStageImplement =  sumArray(ImplementationCost.StagesImplementation[0].Costs.map((ImplementationCost) => ImplementationCost.IntoMoney))//note
	// Start: Get all ImplementationCosts
	useEffect(() => getImplementationCosts(), [])

	console.log("ImplementationCosts===>>>",ImplementationCosts);
	let body = null
	let stt = 1
	let TT = 1
	let step = 0
	let text = ""
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
									<th rowSpan="2">TT</th>
									<th rowSpan="2" width="25%">Nội dung dự trù</th>
									<th rowSpan="2" width="10%">Đơn vị </th>
									<th rowSpan="2" width="5%">Đơn giá </th>
									<th colSpan="2">Số lượng </th>
									<th rowSpan="2" width="12%">Thành tiền </th>
									<th rowSpan="2" width="15%">Ghi chú </th>
									<th rowSpan="2" width="10%">Thao tác</th>
                   				 </tr>
								<tr>
									<th width='3%' as='pre'> Ngày/Lượt</th>
									<th>Người</th>
								</tr>
							</thead>
							<tbody>
								{ImplementationCosts.map(ImplementationCost => ( 
								<>
								{/* Chi phí chung*/}
								<tr>
								<td colSpan={9} align={'left'}>A. {ImplementationCost.GeneralExpense[0].Content}</td>
								</tr>
									{ImplementationCost.GeneralExpense[0].Costs.map(Costs => ( 
										
										<tr  >
											<td>{stt++}  </td>
											<td>{Costs.NameCost}</td>
											<td>{Costs.Units}</td>
											<td>{Costs.UnitPrice.toLocaleString()}</td>
											<td>{Costs.Quantity_days}</td>
											<td>{Costs.Quantity_times}</td>
											<td>{Costs.IntoMoney.toLocaleString()}</td>
											<td>{Costs.Note}  </td>
											<td><ActionButtons_ImplementationCost _id={ImplementationCost._id} />  </td>
											
										</tr>
										
									))}
								<td  colSpan={6} align={'left'} >Tổng {ImplementationCost.GeneralExpense[0].Content}</td>
								<td>{TotalGeneralExpense}</td>
								<td></td>
								{/* End Chi phí chung*/}

								{/* Chi phí triển khai từng giai đoạn*/}
								<tr>
								<td colSpan={9} align={'left'}>B. {ImplementationCost.StagesImplementation[0].Content}</td>
								</tr>
									{ImplementationCost.StagesImplementation[0].Costs.map(Costs => ( 
										<tr  >
											<td>{TT++}  </td>
											<td>{Costs.NameCost}</td>
											<td>{Costs.Units}</td>
											<td>{Costs.UnitPrice.toLocaleString()}</td>
											<td>{Costs.Quantity_days}</td>
											<td>{Costs.Quantity_times}</td>
											<td>{Costs.IntoMoney.toLocaleString()}</td>
											<td>{Costs.Note}  </td>
											<td><ActionButtons_ImplementationCost _id={ImplementationCost._id} />  </td>
											
										</tr>
									))}
								<td  colSpan={6} align={'left'} >Tổng chi phí {ImplementationCost.StagesImplementation[0].Content}</td>
								<td></td>
								<td></td>
								{/* End Chi phí triển khai từng giai đoạn*/}
								
								</>
								))}
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
