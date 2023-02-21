import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useParams } from 'react-router-dom'

//Modal them giai doan chi phi chung
const AddStageGeneralModal = () =>{
	//Contexts
	const{
		showAdd_Stage_GeneralExpense_Modal, setshowAdd_Stage_GeneralExpense_Modal,
		add_Stage_GeneralExpense,
		setShowToast
	} = useContext(ImplementationCostContext)
	//State luu thong tin 
	const [newStageImplementation, setnewStageImplementation] = useState({
		Content: '',
		idcontract:''
	})
	const {Content, idcontract } = newStageImplementation
  //Load id Implementation
  const params = useParams();
  newStageImplementation.idcontract = params.id;

	const onChangeNewImplementationCostForm = event =>
		setnewStageImplementation({ ...newStageImplementation, [event.target.name]: event.target.value })

	const resetAddStageImplementationData = () => {
		setnewStageImplementation({ Content: '', idcontract: '' })
		setshowAdd_Stage_GeneralExpense_Modal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await add_Stage_GeneralExpense(newStageImplementation)//newImplementationCost
		resetAddStageImplementationData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const closeDialog = () => {
		resetAddStageImplementationData()
	}
	return (
		<Modal show={showAdd_Stage_GeneralExpense_Modal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm giai đoạn chi phí chung</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					{/* <Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Id contract
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
					</Form.Group> */}
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Nội dung giai đoạn
						</Form.Text>
						<Form.Control
							type='text'
							placeholder=''
							name='Content'
							required
							aria-describedby='noidung-help'
							value={Content}
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
export default AddStageGeneralModal