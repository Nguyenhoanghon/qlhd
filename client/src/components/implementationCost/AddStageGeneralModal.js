import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext, useState } from 'react'
import { ImplementationCostContext } from '../../contexts/ImplementationCostContext'
import { useParams } from 'react-router-dom'

//Ham them giai doan
const AddStageGeneralModal = () =>{
	//Contexts
	const{
		showAddStageGeneralModal,
		setshowAddStageGeneralModal,
		addStageGeneral,
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
		setshowAddStageGeneralModal(false)
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addStageGeneral(newStageImplementation)//newImplementationCost
		resetAddStageImplementationData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const closeDialog = () => {
		resetAddStageImplementationData()
	}
	return (
		<Modal show={showAddStageGeneralModal} onHide={closeDialog}>
			<Modal.Header closeButton>
				<Modal.Title>Thêm giai đoạn CHI PHI CHUNG</Modal.Title>
			</Modal.Header>
			<Form onSubmit={onSubmit}>
				<Modal.Body>
					<Form.Group>
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
					</Form.Group>
					<Form.Group>
						<Form.Text id='noidung-help' muted as="h6">
							Nội dung giai đoạn
						</Form.Text>
						<Form.Control
							type='text'
							placeholder='Nhập chuỗi'
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