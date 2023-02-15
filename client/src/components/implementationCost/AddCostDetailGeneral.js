import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState, useEffect } from 'react'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useParams } from 'react-router-dom'

//Ham them giai doan chi phi vao chi phi chung
const AddCostDetailGeneral = () => {
	//Contexts
	const {
		ImplementationCostState: { ImplementationCosts },
		showAddCostDetailGeneralModal,
		setshowAddCostDetailGeneralModal,
		addCostDetailGeneral,
		getImplementationCosts_byidContract,
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
		ContentCostId: ''
	})
	const { 
		NameCost,
		Units,
		UnitPrice,
		Quantity_days,
		Quantity_times,
		IntoMoney,
		Note,
		ImplementationCost_Id,
		ContentCostId
	} = newStageImplementation
	//Load id Implementation
	const params = useParams();
	
	useEffect(() => getImplementationCosts_byidContract(params.id), [])
	//newStageImplementation.ImplementationCost_Id = params.id;
	//newStageImplementation.ContentCostId = params.id;

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
			ImplementationCost_Id: '63ec99c4ada883181b030eb4',
			ContentCostId: '63ec99c4e540116534618e19'
		})
		setshowAddCostDetailGeneralModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addCostDetailGeneral(newStageImplementation)//newImplementationCost
		resetAddStageImplementationData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const closeDialog = () => {
		resetAddStageImplementationData()
	}
	return (
		<Modal show={showAddCostDetailGeneralModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm chi phí vào chi phí chung</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							ImplementationCost_Id
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='ImplementationCost_Id'
							required
							aria-describedby='noidung-help'
							value={ImplementationCost_Id}
							onChange={onChangeNewImplementationCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							id Giai doan GeneralCost
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
					</Form.Group>
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
							required
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
							Thành tiền
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='IntoMoney'
							required
							aria-describedby='noidung-help'
							value={IntoMoney}
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
							required
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
export default AddCostDetailGeneral