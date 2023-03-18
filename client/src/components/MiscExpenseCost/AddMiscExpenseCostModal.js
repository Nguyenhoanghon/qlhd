import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MiscExpenseCostContext } from '../../contexts/MiscExpenseContext'

const AddMiscExpenseCostModal = () => {
	// Contexts
	const {
		showAddMiscExpenseCostModal,
		setShowAddMiscExpenseCostModal,
		addMiscExpenseCost,
		setShowToast
	} = useContext(MiscExpenseCostContext)

	// State
	const [newMiscExpenseCost, setNewMiscExpenseCost] = useState({
		Content: '',
		Cost: '',
		Note: '',
		ContractID:''
	})

	const { Content, Cost, Note } = newMiscExpenseCost
	//load idcontract
	const params = useParams();
	newMiscExpenseCost.ContractID = params.id;

	const onChangeNewMiscExpenseCostForm = event =>
		setNewMiscExpenseCost({ ...newMiscExpenseCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddMiscExpenseCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addMiscExpenseCost(newMiscExpenseCost)//newMiscExpenseCost
		resetAddMiscExpenseCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddMiscExpenseCostData = () => {
		setNewMiscExpenseCost({ Content: '', Cost: '', Note: '', ContractID: '' })
		setShowAddMiscExpenseCostModal(false)
	}

	return (
		<Modal show={showAddMiscExpenseCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Bạn muốn thêm chi phí khác?</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					{/* <Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Chọn Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='ContractID'
							required
							aria-describedby='noidung-help'
							value={ContractID}
							onChange={onChangeNewMiscExpenseCostForm}
						/>						
					</Form.Group> */}
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Nội dung chi phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='Content'
							required
							aria-describedby='noidung-help'
							value={Content}
							onChange={onChangeNewMiscExpenseCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='sotien-help' muted  as="h6">
							Số tiền
						</Form.Text>
						<Form.Control
							tpye='text'
							placeholder='Nhập số'
							name='Cost'
							value={Cost} /* tạo ràn buộc số */
							onChange={onChangeNewMiscExpenseCostForm}
						/>
					</Form.Group>
					<Form.Group>
						<Form.Text id='ghichu-help' muted as="h6">
							Ghi chú
						</Form.Text>
						<Form.Control
							as='textarea'
							rows={3}
							placeholder='Nhập chuỗi'
							name='Note'
							value={Note}
							onChange={onChangeNewMiscExpenseCostForm}
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

export default AddMiscExpenseCostModal
