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

	//test su dung numberObject
	const{
		numberObject,
		setnumberObject,
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

	console.log("ImplementationCosts===>>>",ImplementationCosts);
	let body = null
	let data = []
	let stt = 1
	//Function TotalGeneralExpense
	function TotalStageImplementation(stage) {
		let Total = 0;
			ImplementationCosts.map(ImplementationCost => (
				ImplementationCost.StagesImplementation[stage].Costs.map(Costs => (
					Total += Costs.IntoMoney))))
							
		return Total;
	}
	//Function TotalGeneralExpense
	function TotalGeneralExpense(stage) {
		let Total = 0;
			ImplementationCosts.map(ImplementationCost => (
				ImplementationCost.GeneralExpense[stage].Costs.map(Costs => (
					Total += Costs.IntoMoney))))
							
		return Total;
	}
	//Duyet qua so giai doan ====>> chua show duoc
	let test = [];
	function showdata() {
		return 1
	}
	
	//Tieu de Bang chi phi trien khai
	let titleTable = (
		<thead>
			<tr>
				<th rowSpan="2">STT</th>
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
	)
	//Tieu de chi phi chung
	let titleGeneralExpense = (
		<tr>
		<td colSpan={9} align={'left'} bgcolor={'black'}>A. CHI PHÍ CHUNG</td>
		</tr>
	)
	//Tieu de chi phi chung
	let titleImplementationCost = (
		<tr>
		<td colSpan={9} align={'left'} bgcolor={'black'}>B. CHI PHÍ TRIỂN KHAI: </td>
		</tr>
	)
	//In chi phi giai doan tuong ung voi tham so stage 
	function showStageImplementation(stage) {
		let stt = 1;
		let StageImplementation = (
			ImplementationCosts.map(ImplementationCost => (
				<>
					<tr>
						<td colSpan={9} align={'left'}>{ImplementationCost.StagesImplementation[stage].Content}</td>
					</tr>
					{ImplementationCost.StagesImplementation[stage].Costs.map(Costs => (
						<tr>
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
					<td colSpan={6} align={'left'}>CỘNG: </td>
					<td>{TotalStageImplementation(stage).toLocaleString()}</td>
					<td></td>
				</>

			))
		);
		return StageImplementation;
	}
	//In chi phi chung tuong ung voi tham so stage 
	function showGeneralExpense(stage) {
		let stt = 1;
		let StageGeneralExpense = (
			ImplementationCosts.map(ImplementationCost => (
				<>
					<tbody>
						{ImplementationCost.GeneralExpense[stage].Costs.map(Costs => (
							<tr key={ImplementationCost.GeneralExpense[stage].Costs._id}>
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
						<td colSpan={6} align={'left'}>CỘNG A: </td>
						<td>{TotalGeneralExpense(stage).toLocaleString()}</td>
						<td></td>
					</tbody>
				</>

			))
		);
		return StageGeneralExpense;
	}

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
							{titleTable}
							{titleGeneralExpense}
							{showGeneralExpense(0)}
							{titleImplementationCost}
							{showStageImplementation(0)}
							
							<tr>
								<td colSpan={6} align={'left'}>CỘNG B: </td>
								<td></td>
								<td></td>
								<td></td>
							</tr>
							<tr>
								<td colSpan={6} align={'left'}>TỔNG CHI PHÍ TOÀN DỰ ÁN (A+B) </td>
								<td>{(TotalGeneralExpense(0)+ TotalStageImplementation(0)).toLocaleString()}</td>
								<td></td>
								<td></td>
							</tr>

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
			{showdata()} 
			{titleTable}
			
		</>
	)
}

export default ImplementationCost
