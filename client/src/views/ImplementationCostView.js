import { ImplementationCostContext } from '../contexts/ImplementationCostContext'
import { AuthContext } from '../contexts/AuthContext'
import { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Toast from 'react-bootstrap/Toast'
import Table from 'react-bootstrap/Table'
//import 'bootstrap/dist/css/bootstrap.min.css';
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/


//15-3
import Create_Category_Modal from '../components/implementationCost/Create_Category_Modal'
import Update_Category_Modal from '../components/implementationCost/Update_Category_Modal'
import AddStage_Modal from '../components/implementationCost/AddStage_Modal'
import UpdateStage_Modal from '../components/implementationCost/UpdateStage_Modal'
import Add_CostDetail_Modal from '../components/implementationCost/Add_CostDetail_Modal'
import Update_CostDetail_Modal from '../components/implementationCost/Update_CostDetail_Modal'

import {
	Button_Update_Delete_Category,
	Button_AddStage,
	Button_Update_Delete_Stage_Content,
	Button_Add_CostDetail,
	Button_Update_Delete_CostDetail,
} from '../components/implementationCost/ActionButtons';

//View ImplementationCost by idContract
export const Implementation_Cost_byidContract = () => {
	const params = useParams();
	// Contexts
	/* 	const {
			authState: {
				user: { username }
			}
		} = useContext(AuthContext) */

	const {
		ImplementationCostState: { ImplementationCosts, ImplementationCostsLoading },

		//*** 15-3 
		getImplementation_Costs_byidContract, //Function get data for view 
		setshowCreate_Implementation_Category_Modal,


		showToast: { show, message, type },
		setShowToast,
		//showToast
	} = useContext(ImplementationCostContext)

	// Start: Get ImplementationCosts by idcontract
	useEffect(() => getImplementation_Costs_byidContract(params.id))//, [type])
	console.log("getImplementation_Costs_byidContract", ImplementationCosts)

	function Rendering_ImplementationCosts() {
		let TotalImplementation = 0;
		const tableRows = ImplementationCosts.map(
			(element) => {
				let TotalCategory = 0;
				return (
					<>
						<tr >
							<th colSpan="7">{element.Category}</th>
							<th >
								<Button_AddStage idImplementation_Cost={element._id} />
							</th>
							<th ><Button_Update_Delete_Category
								idImplementation_Cost={element._id}
								Category={element.Category} /></th>
						</tr>
						{element.StagesImplementation.map((object => {

							let stt = 1;
							let TotalStage = 0;

							return (

								<>
									<tr>
										<th colSpan="8">
											{object.Content}
										</th>
										<th>
											<Button_Update_Delete_Stage_Content
												idImplementation_Cost={element._id}
												idContentCost={object._id}
												Content={object.Content}
											/>
										</th>
									</tr>
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
									{object.Costs.map((Costs) => {
										TotalStage += Costs.IntoMoney
										TotalCategory += Costs.IntoMoney;
										TotalImplementation += Costs.IntoMoney;
										return (
											<tr >
												<td>{stt++}</td>
												<td>{Costs.NameCost}</td>
												<td className='text-center'>{Costs.Units}</td>
												<td className='text-right'>{Costs.UnitPrice.toLocaleString()}</td>
												<td className='text-center'>{Costs.Quantity_times}</td>
												<td className='text-center'>{Costs.Quantity_days}</td>
												<td className='text-right'>{Costs.IntoMoney.toLocaleString()}</td>
												<td>{Costs.Note}  </td>
												<td><Button_Update_Delete_CostDetail
													Implementation_Cost_Id={element._id}
													ContentCostId={object._id}
													idCost={Costs._id}
													NameCost={Costs.NameCost}
													Units={Costs.Units}
													UnitPrice={Costs.UnitPrice}
													Quantity_days={Costs.Quantity_days}
													Quantity_times={Costs.Quantity_times}
													IntoMoney={Costs.IntoMoney}
													Note={Costs.Note}
												/>
												</td>
											</tr>
										)
									})}
									<tr>
										<th colSpan="6">
											Tổng {object.Content}
										</th>
										<th className='text-right'>
											{TotalStage.toLocaleString()}
										</th>
										<th></th>
										<th>
											<Button_Add_CostDetail Implementation_Cost_Id={element._id}
												ContentCostId={object._id}
												ContentCost={object.Content} />
										</th>

									</tr>
								</>
							)

						}))

						}
						<tr >
							<th colSpan="6">TỔNG {element.Category}</th>
							<th colSpan="3">{TotalCategory.toLocaleString()}</th>
						</tr>
					</>


				)
			}
		)
		return (
			<div>
				<Table responsive="sm" striped bordered hover size="sm">
					{tableRows}
					<tr >
						<th colSpan="6">TỔNG CÁC HẠNG MỤC CHI PHÍ: </th>
						<th colSpan="3">{TotalImplementation.toLocaleString()}</th>
					</tr>
					<tr align={'center'}>
						<th colSpan="9" >
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
							<span> </span>
							<Button
								variant='primary'
								onClick={setshowCreate_Implementation_Category_Modal.bind(this, true)}
							>
								Thêm hạng mục chi
							</Button>

						</th>
					</tr>
				</Table>
			</div>
		)
	}

	//Xu ly bang du lieu
	let body = null

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
						<Button
							variant='primary'
							onClick={setshowCreate_Implementation_Category_Modal.bind(this, true)}
						>
							Thêm hạng mục chi
						</Button>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Card className='text-left mx-5 my-5'>
					<Card.Header as='h1'>CHI TIẾT CHI PHÍ TRIỂN KHAI</Card.Header>
					<Card.Body>
						<Rendering_ImplementationCosts />
					</Card.Body>
				</Card>
			</>
		)

	}

	return (
		<>
			{body}
			{/* 15-3 OK */}
			<Create_Category_Modal />
			<Update_Category_Modal />
			<AddStage_Modal />
			<UpdateStage_Modal />
			<Add_CostDetail_Modal />
			<Update_CostDetail_Modal/>

			{/* end 15-3 */}

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

