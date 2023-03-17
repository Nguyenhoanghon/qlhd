import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'


const Create_Category_Modal = () => {
	// Contexts
	const {
		showCreate_Implementation_Category_Modal,
		setshowCreate_Implementation_Category_Modal,
		create_Implementation_Category,
		setShowToast
	} = useContext(ImplementationCostContext)

	// State
	const [newImplementationCost, setNewImplementationCost] = useState({
		Category: '',
		StagesImplementation: '',
		idcontract:''
	})

	const { Category, StagesImplementation, idcontract } = newImplementationCost

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
		const { success, message } = await create_Implementation_Category(newImplementationCost)//newImplementationCost
		resetAddImplementationCostData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddImplementationCostData = () => {
		setNewImplementationCost({ Category: '', StagesImplementation: '', idcontract:'', user:'' })
		setshowCreate_Implementation_Category_Modal(false)
	}

	return (
		<Modal show={showCreate_Implementation_Category_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>KHỞI TẠO HẠNG MỤC CHI PHÍ</Modal.Title>
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
							Nhập thông tin hạng mục
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
							Nhập thông tin giai đoạn
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

export default Create_Category_Modal
	
