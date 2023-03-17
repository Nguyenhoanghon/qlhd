import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'


//Ham them giai doan chi phi vao chi phi chung
const Add_CostDetail_Modal = (_id) => {
	//Contexts
	
	const {
		
		showAdd_CostDetail_Modal,
		setshowAdd_CostDetail_Modal,     //Goi modal
		Data_Click_On_Button,            //Get Params truyen cho Url
		add_CostDetail_Function,         //Hàm thêm
		setShowToast

	} = useContext(ImplementationCostContext)
	//State luu thong tin 
	const [newStageImplementation, setnewStageImplementation] = useState({
		NameCost: '',
		Units: '',
		UnitPrice: '',
		Quantity_days: '',
		Quantity_times: '',
		IntoMoney: '',
		Note: '',
		ImplementationCost_Id: '',
		ContentCostId: '',
		ContentCost:''
	})
	const { 
		NameCost,
		Units,
		UnitPrice,
		Quantity_days,
		Quantity_times,
		IntoMoney,
		Note,
		Implementation_Cost_Id,
		ContentCostId,
		ContentCost
	} = newStageImplementation
	//Load id Implementation
	
	newStageImplementation.Implementation_Cost_Id = Data_Click_On_Button.Implementation_Cost_Id //params.id;
	newStageImplementation.ContentCostId = Data_Click_On_Button.ContentCostId//params.id;
	newStageImplementation.ContentCost = Data_Click_On_Button.ContentCost

	const onChangeNewImplementationCostForm = event =>
		setnewStageImplementation({ ...newStageImplementation, [event.target.name]: event.target.value })

	const resetAddStageImplementationData = () => {
		setnewStageImplementation({
			NameCost: '',
			Units: '',
			UnitPrice: '',
			Quantity_days: '',
			Quantity_times: '',
			IntoMoney: '',
			Note: '',
			Implementation_Cost_Id: '',
			ContentCostId: '',
			ContentCost:''
		})
		setshowAdd_CostDetail_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await add_CostDetail_Function(newStageImplementation)//note
		resetAddStageImplementationData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const closeDialog = () => {
		resetAddStageImplementationData()
	}
	return (
		<Modal show={showAdd_CostDetail_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm chi phí vào: {ContentCost}</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					{/* <Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Implementation_Cost_Id
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Implementation_Cost_Id'
							required
							aria-describedby='noidung-help'
							value={Implementation_Cost_Id}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ContentCostId-help' muted as="h6">
							idContentCostId
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='ContentCostId'
							required
							aria-describedby='noidung-help'
							value={ContentCostId}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group> */}
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Nội dung dự trù
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='NameCost'
							required
							aria-describedby='noidung-help'
							value={NameCost}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Đơn vị
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Units'
							aria-describedby='noidung-help'
							value={Units}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Đơn giá
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='UnitPrice'
							required
							aria-describedby='noidung-help'
							value={UnitPrice}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Ngày/Lượt
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Quantity_times'
							required
							aria-describedby='noidung-help'
							value={Quantity_times}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Số người
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Quantity_days'
							required
							aria-describedby='noidung-help'
							value={Quantity_days}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='NameCost-help' muted as="h6">
							Ghi chú
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Note'
							aria-describedby='noidung-help'
							value={Note}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					</Modal.Body>
				<Modal.Footer>
					<Button variant='secondary' onClick={closeDialog}>
						Hủy
					</Button>
					<Button variant='info' type='submit'>
						Thêm!
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}
export default Add_CostDetail_Modal