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
	ActionButtons_ImplementationCost,
	ActionButtons_Update_Delete_GeneralCostDetail,
	ActionButtons_Add_GeneralCostDetail,
	ActionButtons_Add_StageCostDetail,
	ActionButtons_Update_Delete_StageCostDetail,
	ActionButtons_Update_Delete_StageGeneral_Expense,
	ActionButtons_Update_Delete_StageImplementation
} from '../components/implementationCost/ActionButtons_ImplementationCost';

import AddImplementationCostModal from '../components/implementationCost/AddImplementationCostModal'
import AddStageImplementationModal from '../components/implementationCost/AddStageImplementationModal'
import AddStageGeneralModal from '../components/implementationCost/AddStageGeneralModal'
import AddCostDetailGeneralModal from '../components/implementationCost/AddCostDetailGeneralModal'
import AddCostDetailStageImplementModal from '../components/implementationCost/AddCostDetailStageImplementModal'

import UpdateStageGeneralModal from '../components/implementationCost/UpdateStageGeneralModal'

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

	console.log("ImplementationCosts===>>>", ImplementationCosts);
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
		ImplementationCostState: { ImplementationCosts,
			StageImplementation,
			ImplementationCostsLoading },
		getImplementationCosts_byidContract,
		showAddImplementationCostModal,
		setShowAddImplementationCostModal,

		showAddStageImplementationModal,
		setshowAddStageImplementationModal,

		showAddStageGeneralModal,
		setshowAddStageGeneralModal,

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
	console.log("ImplementationCosts===>>>", ImplementationCosts);
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
						<Button variant='primary' onClick={setshowAddStageGeneralModal.bind(this, true)}>
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
					<tr>
						<td colSpan={8} align={'left'} bgcolor={''}>{ImplementationCost.GeneralExpense[stage].Content} {':'} {ImplementationCost.GeneralExpense[stage]._id}</td>
						<td>
							<ActionButtons_Update_Delete_StageGeneral_Expense idImplementationCost={ImplementationCost._id} GeneralExpense_id={ImplementationCost.GeneralExpense[stage]._id}/>
						</td>
					</tr>
					{titleTable()}
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
								<td><ActionButtons_Update_Delete_GeneralCostDetail _id={ImplementationCost._id} GeneralExpense_id={ImplementationCost.GeneralExpense[stage]._id} Costs_id={Costs._id} />  </td>

							</tr>
						))}

						<td colSpan={6} align={'left'}>Tổng {ImplementationCost.GeneralExpense.Content}{':'} </td>
						<td>{TotalGeneralExpense(stage).toLocaleString()}</td>
						<td>{ImplementationCost.GeneralExpense[stage]._id}</td>
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
					<tr>
						<td colSpan={8} align={'left'}>{ImplementationCost.StagesImplementation[stage].Content} {':'} {ImplementationCost.StagesImplementation[stage]._id}</td>
						<td>
							<ActionButtons_Update_Delete_StageImplementation idImplementationCost={ImplementationCost._id} StagesImplementation_id={ImplementationCost.StagesImplementation[stage]._id}/>
						</td>
					</tr>
					{titleTable()}
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
							<td><ActionButtons_Update_Delete_StageCostDetail _id={ImplementationCost._id} StagesImplementation_id={ImplementationCost.StagesImplementation[stage]._id} Costs_id={Costs._id} />
								{/* Nut sua xoa 1 chi phi */}
							</td>
						</tr>
					))}
					<td colSpan={6} align={'left'}>Tổng {ImplementationCost.StagesImplementation[stage].Content} {':'} </td>
					<td>{TotalStageImplementation(stage).toLocaleString()}</td>
					<td>{ImplementationCost.StagesImplementation[stage]._id}</td>
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
		if (ImplementationCosts.length != 0)
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
			{/* <UpdateStageGeneralModal/> !!!! not run */} 
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

//View Input GeneralCosts
export const Input_GeneralCost = () => {
	const params = useParams();
	console.log("uri Input_GeneralCost", params)
	// Contexts
	/* 	const {
			authState: {
				user: { username }
			}
		} = useContext(AuthContext) */

	const {
		ImplementationCostState: { ImplementationCosts, ImplementationCostsLoading },
		getImplementationCosts_byidContract,
		setShowAddImplementationCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ImplementationCostContext)

	// Start: Get all ImplementationCosts
	useEffect(() => getImplementationCosts_byidContract(params.id), [])

	console.log("ImplementationCosts===>>>", ImplementationCosts);
	let body = null
	//Function TotalGeneralExpense
	function TotalGeneralExpense(stage) {
		let Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.GeneralExpense[stage].Costs.map(Costs => (
				Total += Costs.IntoMoney))))

		return Total;
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
			<td colSpan={8} align={'left'} bgcolor={'black'}>A. CHI PHÍ CHUNG</td>
			<Button
				variant='primary'
				onClick={setShowAddImplementationCostModal.bind(this, true)}
			>
				Thêm
			</Button>
		</tr>
	)
	//In mot giai doan trong chi phi chung
	function showGeneralExpense(stage) {
		let stt = 1;
		return (
			ImplementationCosts.map(ImplementationCost => (
				<>
					<tr>
						<td colSpan={8} align={'left'}>{ImplementationCost.GeneralExpense[stage].Content} {':'} {ImplementationCost.GeneralExpense[stage]._id}</td>
						<td>
							{/* <Button variant='primary' onClick={setshowAddCostDetailGeneralModal.bind(this, true)}>
								Thêm chi phí
							</Button> */}

							<ActionButtons_Add_GeneralCostDetail _id={ImplementationCost._id} GeneralExpense_id={ImplementationCost.GeneralExpense[stage]._id} />
						</td>
					</tr>
					{titleTable()}
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
								<td><ActionButtons_Update_Delete_GeneralCostDetail _id={ImplementationCost._id} GeneralExpense_id={ImplementationCost.GeneralExpense[stage]._id} Costs_id={Costs._id} />  </td>

							</tr>
						))}
						<td colSpan={6} align={'left'}>Tổng {ImplementationCost.GeneralExpense.Content}{':'} </td>
						<td>{TotalGeneralExpense(stage).toLocaleString()}</td>
						<td>{ImplementationCost.GeneralExpense[stage]._id}</td>
						<td>
							<a href={`/implementation-cost/general-cost/${ImplementationCost._id}/${ImplementationCost.GeneralExpense[stage]._id}`}>
								<Button variant='primary'>
									Nhập Link
								</Button>
							</a>
							{/* <Button
								variant='primary'
								onClick={setshowAddCostDetailGeneralModal.bind(this, true)}
							>
								Thêm chi phí
							</Button> */}
							{/* <ActionButtons_Add_GeneralCostDetail _id={ImplementationCost._id} GeneralExpense_id={ImplementationCost.GeneralExpense[stage]._id} /> */}

						</td>
					</tbody>
				</>
			))
		)
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
					<Card.Header as='h1'>DANH SÁCH CHI PHÍ CHUNG</Card.Header>
					<Card.Body>
						<Table responsive="sm" striped bordered hover size="sm" >
							{titleTable}
							{titleGeneralExpense}
							{showGeneralExpense(0)}
							<><div>Not data</div></>
						</Table>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>DANH SÁCH CHI PHÍ CHUNG</Card.Header>
					<Card.Body>
						<Table responsive="sm" striped bordered hover size="sm" >
							{titleGeneralExpense}
							{titleTable}
							{showGeneralExpense(0)}
						</Table>
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

//View Input StageImplement
export const Input_StageImplement = () => {
	const params = useParams();

	// Contexts
	/* 	const {
			authState: {
				user: { username }
			}
		} = useContext(AuthContext) */

	const {
		ImplementationCostState: { ImplementationCosts, ImplementationCostsLoading },
		getImplementationCosts_byidContract,
		setShowAddImplementationCostModal,
		showToast: { show, message, type },
		setShowToast
	} = useContext(ImplementationCostContext)


	// Start: Get all ImplementationCosts
	useEffect(() => getImplementationCosts_byidContract(params.id), [])

	console.log("ImplementationCosts===>>>", ImplementationCosts);
	let body = null

	//Function TotalStageImplementation
	function TotalStageImplementation(stage) {
		let Total = 0;
		ImplementationCosts.map(ImplementationCost => (
			ImplementationCost.StagesImplementation[stage].Costs.map(Costs => (
				Total += Costs.IntoMoney))))

		return Total;
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
	let titleImplementationCost = (
		<tr>
			<td colSpan={8} align={'left'} bgcolor={'black'}>B. CHI PHÍ TRIỂN KHAI: </td>
		</tr>
	)
	//In chi phi giai doan tuong ung voi tham so stage (su dung chung cho General va Stage)
	function showStageImplementation(stage) {
		let stt = 1;
		let StageImplementation = (
			ImplementationCosts.map(ImplementationCost => (
				<>
					<tr>
						<td colSpan={9} align={'left'}>{ImplementationCost.StagesImplementation[stage].Content} {':'} {ImplementationCost._id}</td>
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
							<td>{/* <ActionButtons_StageCostDetail _id={ImplementationCost._id} StagesImplementation_id={ImplementationCost.StagesImplementation[stage]._id} Costs_id={Costs._id} /> */}
								{/* Nut sua xoa 1 chi phi */}
							</td>
						</tr>
					))}
					<td colSpan={6} align={'left'}>CỘNG: </td>
					<td>{TotalStageImplementation(stage).toLocaleString()}</td>
					<td>{ImplementationCost.StagesImplementation[stage]._id}</td>
					<td>
						<a href={`/implementation-cost/contract/${params.id}`}>
							<Button
								variant='primary'
							>
								Kết thúc
							</Button>
						</a>
					</td>
				</>

			))
		);
		return StageImplementation;
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
					<Card.Header as='h1'>CHI TIẾT GIAI ĐOẠN</Card.Header>
					<Card.Body>
						<Table responsive="sm" striped bordered hover size="sm" >
							{titleTable}
							{titleImplementationCost}
							{showStageImplementation(0)}

							<tr>
								<td colSpan={6} align={'left'}>CỘNG B: </td>
								<td>{TotalStageImplementation(0).toLocaleString()}</td>
								<td></td>
								<td></td>
							</tr>
						</Table>
					</Card.Body>
				</Card>
			</>
		)
	} else {
		body = (
			<>
				<Card className='text-center mx-5 my-5'>
					<Card.Header as='h1'>CHI TIẾT GIAI ĐOẠN</Card.Header>
					<Card.Body>
						<Table responsive="sm" striped bordered hover size="sm" >
							{titleImplementationCost}
							{titleTable}
							{showStageImplementation(0)}
						</Table>
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