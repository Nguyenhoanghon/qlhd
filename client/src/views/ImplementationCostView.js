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
/* import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import Col from 'react-bootstrap/Col' 
import addIcon from '../assets/plus-circle-fill.svg'*/

import {
	Buttons_ImplementationCost,
	ActionButtons_Update_Delete_GeneralCostDetail,
	ActionButtons_Add_GeneralCostDetail,
	ActionButtons_Add_StageCostDetail,
	ActionButtons_Update_Delete_StageCostDetail,

	Buttons_Update_Delete_GeneralExpense_Content,
	Buttons_Update_Delete_StageImplementation_Content
} from '../components/implementationCost/ActionButtons_ImplementationCost';

import AddImplementationCostModal from '../components/implementationCost/AddImplementationCostModal'
import AddStageImplementationModal from '../components/implementationCost/AddStageImplementationModal'
import AddStageGeneralModal from '../components/implementationCost/AddStageGeneralModal'
import AddCostDetailGeneralModal from '../components/implementationCost/AddCostDetailGeneralModal'
import AddCostDetailStageImplementModal from '../components/implementationCost/AddCostDetailStageImplementModal'
import UpdateStage_GeneralExpense_Modal from '../components/implementationCost/UpdateStage_GeneralExpense_Modal'
import UpdateStage_Implementation_Content_Modal from '../components/implementationCost/UpdateStage_Implementation_Modal'
import UpdateCost_GeneralExpense_Modal from '../components/implementationCost/UpdateCost_GeneralExpense_Modal'
import UpdateCost_Implementation_Modal from '../components/implementationCost/UpdateCost_Implementation_Modal'

//View all
export const ImplementationCost = () => {
	// Contexts
	const {
		authState: {
			user: { username }
		}
	} = useContext(AuthContext)

	const {
		ImplementationCostState: { ImplementationCost, ImplementationCosts, ImplementationCostsLoading },
		find_ImplementationCosts,
		setShowAddImplementationCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ImplementationCostContext)


	// Start: Get all ImplementationCosts
	useEffect(() => find_ImplementationCosts(), [])
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
							<td><Buttons_ImplementationCost _id={ImplementationCost._id} />  </td>
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
								<td>{Costs.Quantity_times}</td>
								<td>{Costs.Quantity_days}</td>
								<td>{Costs.IntoMoney.toLocaleString()}</td>
								<td>{Costs.Note}  </td>
								<td><Buttons_ImplementationCost _id={ImplementationCost._id} />  </td>

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
								<td>{(TotalGeneralExpense(0) + TotalStageImplementation(0)).toLocaleString()}</td>
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


		</>
	)
}
//View ImplementationCost by idContract
export const ImplementationCost_byidContract = () => {
	const params = useParams();
	// Contexts
	/* 	const {
			authState: {
				user: { username }
			}
		} = useContext(AuthContext) */

	const {
		ImplementationCostState: { ImplementationCosts,ImplementationCost,
			StageImplementation,
			ImplementationCostsLoading },
		GetID,
		getImplementationCosts_byidContract,
		showAddImplementationCostModal,
		setShowAddImplementationCostModal,

		showAddStageImplementationModal,
		setshowAddStageImplementationModal,
//CHI PHI CHUNG
		showAdd_Stage_GeneralExpense_Modal,
		setshowAdd_Stage_GeneralExpense_Modal,

		addCostDetailGeneral,
		showAddCostDetailGeneralModal,
		setshowAddCostDetailGeneralModal,

		// !!!!
		update_GeneralExpense_Content,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ImplementationCostContext)

	// Start: Get ImplementationCosts by idcontract
	useEffect(() => getImplementationCosts_byidContract(params.id)) //!!! Bug load lien tuc
	

	//Ham tinh tong chi phi 1 giai doan trien khai
	function TotalStageImplementation(stage) {
		let Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.StagesImplementation[stage].Costs.map(Costs => (
				Total += Costs.IntoMoney))))

		return Total;
	}
	// Ham tinh tong tat ca giai doan trien khai
	function All_TotalStageImplementation(ImplementationCosts) {
		let All_Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.StagesImplementation.forEach((element, index) => {
				All_Total += TotalStageImplementation(index)
			})))
		return All_Total;
	}
	////Ham tinh tong chi phi 1 giai doan chi phi chung
	function TotalGeneralExpense(stage) {
		let Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.GeneralExpense[stage].Costs.map(Costs => (
				Total += Costs.IntoMoney

			))))

		return Total;
	}
	// Ham tinh tong tat ca giai doan trien khai
	function All_TotalGeneralExpense(ImplementationCosts) {
		let All_Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.GeneralExpense.forEach((element, index) => {
				All_Total += TotalGeneralExpense(index)
				//console.log("Tong chi chi phi chung;", All_Total);
			})))

		return All_Total;
	}

	//Tieu de Bang chi phi
	function titleTable() {
		return (
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
	}
	//Tieu de chi phi chung
	function titleGeneralExpense() {
		return (
			<thead>
				<tr>
					<td colSpan={6} align={'left'} bgcolor={'black'}>A. CHI PHÍ CHUNG</td>
					<td>

					</td>
					<td> 
						<Button variant='primary' onClick={setshowAdd_Stage_GeneralExpense_Modal.bind(this, true)}>
							Thêm giai đoạn
						</Button>
					</td>
					<td>

					</td>
				</tr>
			</thead>
		)
	}
	//Tieu de chi phi Giai đoạn
	function titleImplementationCost() {
		return (
			<thead>
				<tr>
					<td colSpan={6} align={'left'} bgcolor={'black'}>B. CHI PHÍ TRIỂN KHAI: </td>
					<td>
					</td>
					<td><Button
						variant='primary'
						onClick={setshowAddStageImplementationModal.bind(this, true)}
					>
						Thêm giai đoạn
					</Button>
					</td>
					<td>
					</td>
				</tr>
			</thead >
		)
	}

	//In mot giai doan trong chi phi chung
	function showGeneralExpense(stage) {
		let stt = 1;
		return (
			ImplementationCosts.map(ImplementationCost => (
				<>
					<tr key={ImplementationCost._id}>
						<td colSpan={8} align={'left'} bgcolor={''}>{ImplementationCost.GeneralExpense[stage].Content} {/* {':'} {ImplementationCost.GeneralExpense[stage]._id} */}</td>
						<td>
							<Buttons_Update_Delete_GeneralExpense_Content
							_id={ImplementationCost._id} 
							GeneralExpense_id={ImplementationCost.GeneralExpense[stage]._id}
							GeneralExpense_Content={ImplementationCost.GeneralExpense[stage].Content}
							/>
						</td>
					</tr>
					{titleTable()}
					<tbody>

						{ImplementationCost.GeneralExpense[stage].Costs.map(Costs => (
							<tr key={ImplementationCost._id}>
								<td>{stt++}  </td>
								<td>{Costs.NameCost}</td>
								<td>{Costs.Units}</td>
								<td>{Costs.UnitPrice.toLocaleString()}</td>
								<td>{Costs.Quantity_times}</td>
								<td>{Costs.Quantity_days}</td>
								
								<td>{Costs.IntoMoney.toLocaleString()}</td>
								<td>{Costs.Note}  </td>
								<td><ActionButtons_Update_Delete_GeneralCostDetail 
								idcontract={ImplementationCost._id} 
								idContentCost={ImplementationCost.GeneralExpense[stage]._id} 
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
						))}

						<td colSpan={6} align={'left'}>Tổng {ImplementationCost.GeneralExpense.Content}{':'} </td>
						<td>{TotalGeneralExpense(stage).toLocaleString()}</td>
						<td></td>
						<td>
							<ActionButtons_Add_GeneralCostDetail _id={ImplementationCost._id} GeneralExpense_id={ImplementationCost.GeneralExpense[stage]._id} Content_name={ImplementationCost.GeneralExpense[stage].Content} />
						</td>
					</tbody>
				</>
			))
		)
	}
	//in tat ca giai doan trien khai
	function showdata_All_GeneralExpense(ImplementationCosts) {
		let data = []
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.GeneralExpense.forEach((element, index) => {
				data.push(showGeneralExpense(index))
			})))
		return data
	}
	//In mot giai doan trien khai
	function showStageImplementation(stage) {
		let stt = 1;
		return (
			ImplementationCosts.map(ImplementationCost => (
				<>
					<tr key={ImplementationCost._id}>
						<td colSpan={8} align={'left'}>{ImplementationCost.StagesImplementation[stage].Content}{/*  {':'} {ImplementationCost.StagesImplementation[stage]._id} */}</td>
						<td>
							<Buttons_Update_Delete_StageImplementation_Content 
							_id={ImplementationCost._id} 
							StagesImplementation_id={ImplementationCost.StagesImplementation[stage]._id}
							StagesImplementation_Content={ImplementationCost.StagesImplementation[stage].Content}
							/>
						</td>
					</tr>
					{titleTable()}
					{ImplementationCost.StagesImplementation[stage].Costs.map(Costs => (
						<tr key={ImplementationCost._id}>
							<td>{stt++}  </td>
							<td>{Costs.NameCost}</td>
							<td>{Costs.Units}</td>
							<td>{Costs.UnitPrice.toLocaleString()}</td>
							<td>{Costs.Quantity_times}</td>
							<td>{Costs.Quantity_days}</td>
							
							<td>{Costs.IntoMoney.toLocaleString()}</td>
							<td>{Costs.Note}  </td>
							<td><ActionButtons_Update_Delete_StageCostDetail
							idcontract={ImplementationCost._id} 
							idContentCost={ImplementationCost.StagesImplementation[stage]._id} 
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
					))}
					<td colSpan={6} align={'left'}>Tổng {ImplementationCost.StagesImplementation[stage].Content} {':'} </td>
					<td>{TotalStageImplementation(stage).toLocaleString()}</td>
					<td></td>
					<td>
						<ActionButtons_Add_StageCostDetail _id={ImplementationCost._id} StagesImplementation_id={ImplementationCost.StagesImplementation[stage]._id} Content_name={ImplementationCost.StagesImplementation[stage].Content} />
					</td>
				</>

			))
		)
	}
	//in tat ca giai doan trien khai
	function showdata_All_StageImplementation(ImplementationCosts) {
		let data = []
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.StagesImplementation.forEach((element, index) => {
				data.push(showStageImplementation(index))
			})))
		return data
	}

	function showAll_Total(ImplementationCosts) {
		if (ImplementationCosts.length !== 0)
			return (
				<>
					<tr>
						<td colSpan={6} align={'left'}> Tổng các giai đoạn triển khai (B) </td>
						<td>{All_TotalStageImplementation(ImplementationCosts).toLocaleString()}</td>
						<td></td>
						<td></td>
					</tr>
					<tr>
						<td colSpan={6} align={'left'}>TỔNG CHI PHÍ TOÀN DỰ ÁN (A+B) </td>
						<td>{(All_TotalGeneralExpense(ImplementationCosts) + All_TotalStageImplementation(ImplementationCosts)).toLocaleString()}</td>
						<td></td>
						<td></td>
					</tr>
				</>
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
							onClick={setShowAddImplementationCostModal.bind(this, true)}
						>
							Khởi tạo chi phí triển khai
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
							{titleGeneralExpense()}
							{showdata_All_GeneralExpense(ImplementationCosts)}
							<tr>
								<td colSpan={6} align={'left'}> Tổng chi phí chung (A) </td>
								<td>{All_TotalGeneralExpense(ImplementationCosts).toLocaleString()}</td>
								<td></td>
								<td></td>
							</tr>
						</Table>

						<Table responsive="sm" striped bordered hover size="sm" >
							{titleImplementationCost()}
							{showdata_All_StageImplementation(ImplementationCosts)}
							{showAll_Total(ImplementationCosts)}
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
			<AddStageImplementationModal />
			<AddStageGeneralModal />
			<AddImplementationCostModal />
			<AddCostDetailGeneralModal />
			<AddCostDetailStageImplementModal />

			<UpdateStage_GeneralExpense_Modal/>
			<UpdateStage_Implementation_Content_Modal/> 
			<UpdateCost_GeneralExpense_Modal/>
			<UpdateCost_Implementation_Modal/>
			{/* {ImplementationCost !== null && <UpdateStage_GeneralExpense_Modal />} */}
			
			
			{/* !!!! After ImplementationCost is added, show toast */}
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

