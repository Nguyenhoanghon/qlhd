import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'


const AddImplementationCostModal = () => {
	// Contexts
	const {
		showAddImplementationCostModal,
		setShowAddImplementationCostModal,
		addImplementationCost,
		setShowToast
	} = useContext(ImplementationCostContext)

	// State
	const [newImplementationCost, setNewImplementationCost] = useState({
		Category: '',
		GeneralExpense: '',
		StagesImplementation: '',
		idcontract:''
	})

	const { Category, GeneralExpense, StagesImplementation, idcontract } = newImplementationCost

	//Load id Implementation
	const params = useParams();
	newImplementationCost.idcontract = params.id;

	const onChangeNewImplementationCostForm = event =>
		setNewImplementationCost({ ...newImplementationCost, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddImplementationCostData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addImplementationCost(newImplementationCost,idcontract)//newImplementationCost
		resetAddImplementationCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddImplementationCostData = () => {
		setNewImplementationCost({ Category: '', GeneralExpense: '', StagesImplementation: '', idcontract:'' })
		setShowAddImplementationCostModal(false)
	}

	return (
		<Modal show={showAddImplementationCostModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Nhập nội dung giai đoạn</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Chọn Hợp đồng
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
							name='idcontract'
							required
							aria-describedby='noidung-help'
							value={idcontract}
							onChange={onChangeNewImplementationCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='Category-help' muted as="h6">
							Hạng mục chi phí
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Category'
							required
							aria-describedby='noidung-help'
							value={Category}
							onChange={onChangeNewImplementationCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Nội dung chi phí chung
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='GeneralExpense'
							required
							aria-describedby='noidung-help'
							value={GeneralExpense}
							onChange={onChangeNewImplementationCostForm}
						/>						
					</Form.Group>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Nội dung giai đoạn chi phí triển khai
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='StagesImplementation'
							required
							aria-describedby='noidung-help'
							value={StagesImplementation}
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

export default AddImplementationCostModal
	
